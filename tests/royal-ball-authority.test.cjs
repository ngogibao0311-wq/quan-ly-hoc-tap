const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(
    path.join(root, 'js/royal-ball.js'),
    'utf8'
);

test('royal-ball.js parses as JavaScript', () => {
    new vm.Script(source, {
        filename: 'js/royal-ball.js'
    });
});

test('student Royal Ball reward is only a pending proposal', () => {
    const start = source.indexOf('    calculateReward: async function');
    const end = source.indexOf(
        '    // ==========================================\n    // XÁC MINH PHẦN THƯỞNG DẠ HỘI',
        start
    );

    assert.ok(start >= 0, 'calculateReward must exist');
    assert.ok(end > start, 'teacher verification section must follow calculateReward');

    const studentRewardCode = source.slice(start, end);

    assert.match(studentRewardCode, /status:\s*'pending'/);
    assert.match(studentRewardCode, /clientProposal:\s*true/);
    assert.match(studentRewardCode, /pendingReward/);

    assert.doesNotMatch(
        studentRewardCode,
        /student_coins\//,
        'calculateReward must not directly mutate student Coin'
    );
    assert.doesNotMatch(
        studentRewardCode,
        /student_inventory\//,
        'calculateReward must not directly mutate inventory'
    );
    assert.doesNotMatch(
        studentRewardCode,
        /pushDB\s*\(\s*['"]spin_history['"]/,
        'client proposal must not finalize spin history'
    );
});

test('teacher owns Royal Ball approve/reject and authoritative grant', () => {
    assert.match(source, /approveRewardRequest:\s*async function/);
    assert.match(source, /rejectRewardRequest:\s*async function/);
    assert.match(source, /teacherRole\s*!==\s*'teacher'/);
    assert.match(source, /source:\s*'royal_ball_teacher_approved'/);
    assert.match(source, /verificationRequestId:\s*requestId/);
    assert.match(source, /status['"\]]*\s*\]\s*=\s*'approved'|pendingReward\/status.*approved/s);
});

test('Royal Ball uses server time offset for event checks', () => {
    assert.match(source, /syncServerTimeOffset/);
    assert.match(source, /getServerNow/);
    assert.match(
        source,
        /isEventActive:\s*function\s*\(\)\s*\{[\s\S]*?new Date\(this\.getServerNow\(\)\)/
    );
});
