from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {'.git', 'assets', 'node_modules'}
TEXT_SUFFIXES = {'.js', '.html', '.json', '.css', '.md', '.txt', '.yml', '.yaml', '.toml'}

PATTERNS = {
    'inventory_node': r'student_inventory',
    'coin_node': r'student_coins',
    'money_offset_node': r'student_money_offset',
    'bonus_ticket_node': r'student_bonus_tickets',
    'historical_ticket': r'historical.*ticket|ticket.*historical',
    'discount_node': r'student_discounts',
    'cash_request': r'cash_requests',
    'transaction_logs': r'transaction_logs|TransactionHistory',
    'leaderboard_reward_type': r'leaderboard_reward',
    'daily_login_source': r"['\"]daily_login['\"]",
    'leaderboard_chest_source': r"['\"]leaderboard_chest['\"]",
    'royal_ball_source': r"['\"]royal_ball['\"]",
    'bellum': r'Bellum|bellum',
    'hoihoa': r'hoihoa|HoiHoa|Hội Họa',
    'refund_pending': r'refund_pending|failed_refunded',
    'purchase_locks': r'purchase_locks',
    'question_bank_legacy': r'question_bank',
    'questionBank': r'questionBank',
    'startup_fail': r'AppStartupLoader.*fail|startupLoader.*fail',
    'firebaseConfig': r'firebaseConfig',
    'renderStudentRoadmap': r'renderStudentRoadmap',
    'unapplyItem': r'unapplyItem',
    'MidAutumnCalendar': r'MidAutumnCalendar',
    'buyItem': r'\bbuyItem\b|processPayment',
    'trialItem': r'\btrialItem\b',
    'redeemMidAutumn': r'MidAutumnCoinManager.*redeem|\.redeem\(',
    'birthday_redeem': r'redeemBirthdayItem|redeemSpecialBirthdayItem',
    'studentStoreCanUseItemSync': r'studentStoreCanUseItemSync',
    'getDBStrict': r'getDBStrict|\bgetDB\b|\bpushDB\b|\bupdateDB\b|\bremoveDB\b',
    'SystemUpdateManager': r'SystemUpdateManager|applySystemUpdate',
    'retention_schedule': r'HistoryRetention.*scheduleTeacherCleanup|scheduleTeacherCleanup',
    'plaintext_password': r'\.password\b|password\s*:',
    'Math_random': r'Math\.random\(',
    'localStorage_economic': r'localStorage',
    'direct_listener': r'\.on\s*\(\s*[\'\"]value[\'\"]',
    'transaction_call': r'\.transaction\s*\(',
    'operationId': r'operationId|operation_id|reservationId|claimToken|lease',
}

ECONOMIC_TERMS = re.compile(r'(student_coins|student_money_offset|student_bonus_tickets|student_discounts|student_inventory|cash_requests|ticket|coin|discount|reward|wallet|currency|chest|conversion)', re.I)
WRITE_TERMS = re.compile(r'\.(set|update|transaction|push|remove)\s*\(|updateDB\s*\(|pushDB\s*\(|setDB\s*\(', re.I)


def iter_text_files():
    for p in ROOT.rglob('*'):
        if not p.is_file():
            continue
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            continue
        yield p.relative_to(ROOT), text


def contexts(text: str, regex: str, before=2, after=4, max_hits=30):
    lines = text.splitlines()
    rx = re.compile(regex, re.I)
    hits = []
    for i, line in enumerate(lines):
        if rx.search(line):
            lo = max(0, i-before)
            hi = min(len(lines), i+after+1)
            hits.append((i+1, '\n'.join(f'{j+1:5d}: {lines[j]}' for j in range(lo, hi))))
            if len(hits) >= max_hits:
                break
    return hits


def main():
    files = list(iter_text_files())
    print(f'REPO_ROOT={ROOT}')
    print(f'TEXT_FILES={len(files)}')
    print('\n=== FILE INVENTORY ===')
    for p, text in files:
        print(f'{p}\t{len(text.splitlines())} lines\t{len(text)} chars')

    print('\n=== PATTERN INDEX ===')
    for name, regex in PATTERNS.items():
        print(f'\n## {name} / {regex}')
        total = 0
        for p, text in files:
            hs = contexts(text, regex, before=1, after=2, max_hits=8)
            if hs:
                total += len(hs)
                for line_no, ctx in hs:
                    print(f'-- {p}:{line_no}')
                    print(ctx)
        print(f'COUNT_SHOWN={total}')

    print('\n=== ECONOMIC WRITES / AUTHORITY HOTSPOTS ===')
    for p, text in files:
        lines = text.splitlines()
        for i, line in enumerate(lines):
            if ECONOMIC_TERMS.search(line) and WRITE_TERMS.search(line):
                lo=max(0,i-4); hi=min(len(lines), i+8)
                print(f'-- {p}:{i+1}')
                print('\n'.join(f'{j+1:5d}: {lines[j]}' for j in range(lo,hi)))

    print('\n=== JS DUPLICATE TOP-LEVEL/NAMED FUNCTION CANDIDATES ===')
    defs = {}
    def_rx = re.compile(r'^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(|^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|^\s*(?:static\s+)?(?:async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{')
    for p, text in files:
        if p.suffix != '.js':
            continue
        for i, line in enumerate(text.splitlines(), 1):
            m = def_rx.search(line)
            if not m: continue
            name = next((g for g in m.groups() if g), None)
            if not name: continue
            defs.setdefault((str(p), name), []).append(i)
    for (p, name), locs in sorted(defs.items()):
        if len(locs) > 1:
            print(f'{p}: {name} -> {locs}')

    rules_path = ROOT / 'database.rules.patched.json'
    print('\n=== RULES SELECTED NODES ===')
    try:
        rules = json.loads(rules_path.read_text(encoding='utf-8'))['rules']
        selected = [
            'users','student_coins','student_money_offset','student_bonus_tickets','student_discounts',
            'student_inventory','transaction_logs','cash_requests','store_purchase_ops','store_trial_claims',
            'purchase_locks','leaderboard_reward_claims','daily_login_claims','royal_ball_claims',
            'bellum_claims','hoihoa_rounds','hoihoa_vote_usage','mid_autumn_wallets','profile_requests',
            'profile_request_active','profile_request_mutations','exam_sessions','exam_active_locks'
        ]
        for key in selected:
            if key in rules:
                print(f'\n## RULE {key}')
                print(json.dumps(rules[key], ensure_ascii=False, indent=2))
            else:
                print(f'\n## RULE {key}: <ABSENT>')
    except Exception as e:
        print(f'RULE_PARSE_ERROR={e!r}')

    print('\n=== HTML SCRIPT ORDER ===')
    for html in ['index.html','student.html','teacher.html']:
        p = ROOT / html
        if not p.exists(): continue
        for i, line in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
            if '<script' in line.lower():
                print(f'{html}:{i}: {line.strip()}')

if __name__ == '__main__':
    main()
