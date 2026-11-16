/* Plan 4: local artwork only. Ownership and purchases stay with StoreManager/Worker. */
(() => {
    'use strict';
    if (window.Plan4Runtime) return;
    const CSS = 'css/plan4-items.css?v=20261108.clean1';
    const designs = {
        alger: ['Alger Wilson', 'Thánh Ca Hải Triều', '#6ed1d4', '#0d2539', '#d7b976', 'Sóng biển khắc lời thề trên hải đồ cổ.'],
        emlyn: ['Emlyn White', 'Huyết Nguyệt Thánh Đường', '#e4a3b8', '#341829', '#e9d8b5', 'Trăng đỏ soi qua những ô kính thánh đường.'],
        liu_xiao: ['Liu Xiao', 'Nghịch Chuyển Thời Không', '#d0a2ff', '#241a40', '#f0ce8c', 'Bánh răng định mệnh mở ra những dòng thời gian.'],
        qiao_ling: ['Qiao Ling', 'Hồi Âm Ký Ức', '#ffbd88', '#442b33', '#ffe6af', 'Những khung ảnh giữ lại hơi ấm của ngày xưa.'],
        hemera: ['Hemera', 'Bình Minh Vĩnh Cửu', '#f4cb6e', '#43351e', '#fff5c7', 'Nắng mai thức giấc trên hàng cột thiên giới.'],
        greed: ['Tham Lam', 'Kim Khố Vô Tận', '#85deb7', '#193f36', '#eac874', 'Ngọc lục bảo và tiền vàng vây quanh ngai báu.'],
        noctyriel: ['Noctyriel', 'Tinh Vực Dạ Miện', '#c5b0f0', '#251d3e', '#ded3b9', 'Vương miện bóng đêm gọi những quỹ đạo xa xăm.'],
        noel_nam: ['Sứ Giả Mùa Đông', 'Chuyến Xe Sao Bắc', '#9de5d6', '#153e3e', '#eacc83', 'Xe quà băng qua rừng thông dưới ánh sao phương Bắc.'],
        noel_nu: ['Tiên Nữ Quà Tặng', 'Vũ Hội Chuông Ngân', '#ffb4b6', '#4a2630', '#f5d990', 'Chuông bạc, nơ lụa và quà tặng đón đêm đoàn viên.']
    };
    const many = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
    const svg = art => `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${art}</svg>`;
    const star = '<path d="M200 105 220 176 295 200 220 224 200 295 180 224 105 200 180 176Z"/>';
    const art = {
        alger: '<circle cx="200" cy="170" r="115"/><circle cx="200" cy="170" r="102" stroke-dasharray="2 9"/><path d="M200 28V289M67 170H333M190 69 211 252 200 271 189 252 210 69ZM200 271 151 212M200 271 249 212M151 212V237M249 212V237"/>' + many(5, i => `<path d="M0 ${300+i*17}Q50 ${270+i*17} 100 ${300+i*17}T200 ${300+i*17}T300 ${300+i*17}T400 ${300+i*17}"/>`),
        emlyn: '<path d="M40 390V150Q40 50 200 10Q360 50 360 150V390M58 390V155Q58 70 200 30Q342 70 342 155V390M200 30V390M60 155H340M60 280H340"/><circle cx="200" cy="170" r="82"/><path d="M230 96A80 80 0 1 0 270 220 69 69 0 0 1 230 96Z" fill="currentColor" fill-opacity=".18"/><path d="M200 285 243 330 200 376 157 330ZM80 170 117 218 80 263M320 170 283 218 320 263"/>',
        liu_xiao: '<g class="p4-rotate">' + many(12,i=>`<path transform="rotate(${i*30} 200 200)" d="M182 28H218L224 51 247 61 264 48 289 72 277 94"/>`) + '<circle cx="200" cy="200" r="148" stroke-dasharray="2 8"/><circle cx="200" cy="200" r="122"/></g><path d="M200 80V200L278 250M75 70 325 330M325 70 75 330"/><path d="M145 90H255L220 150V250L255 310H145L180 250V150Z" fill="currentColor" fill-opacity=".09"/>',
        qiao_ling: '<g transform="rotate(-12 200 200)"><rect x="35" y="50" width="215" height="270" rx="6"/><path d="M50 68H235V265H50ZM65 235 120 172 156 213 184 180 221 235"/><circle cx="180" cy="120" r="25"/></g><g transform="rotate(15 260 250)"><rect x="145" y="155" width="210" height="225" rx="6" fill="currentColor" fill-opacity=".06"/><path d="M160 171H340V325H160M180 300 229 235 265 277 303 230 325 300M175 347H250"/></g><path d="M35 350Q170 270 300 35" stroke-dasharray="3 7"/>',
        hemera: '<circle cx="200" cy="130" r="60"/><circle cx="200" cy="130" r="72"/>' + many(24,i=>`<path transform="rotate(${i*15} 200 130)" d="M200 40V15"/>`) + '<path d="M25 390V215H80V390M320 390V215H375V390M15 215H90V200H15ZM310 215H385V200H310ZM38 225V380M67 225V380M333 225V380M362 225V380M0 395H400M0 300Q100 260 200 300T400 300"/>',
        greed: '<path d="M200 40 285 125 250 240H150L115 125Z" fill="currentColor" fill-opacity=".12"/><path d="M115 125H285M200 40 160 125 200 240 240 125ZM35 315 22 210 80 252 125 205 170 268 200 215 230 268 275 205 320 252 378 210 365 315ZM35 332H365V358H35Z"/>' + many(5,i=>`<g transform="translate(${45+i*77} ${350+(i%2)*15})"><ellipse rx="28" ry="9"/><path d="M-28 0V10Q0 29 28 10V0"/></g>`),
        noctyriel: '<g class="p4-rotate"><ellipse cx="200" cy="200" rx="182" ry="72" transform="rotate(-35 200 200)"/><ellipse cx="200" cy="200" rx="182" ry="72" transform="rotate(35 200 200)"/><circle cx="200" cy="200" r="140" stroke-dasharray="2 12"/><circle cx="68" cy="122" r="18"/><circle cx="332" cy="276" r="25"/></g><path d="M135 183 110 115 165 151 200 90 235 151 290 115 265 183ZM140 197H260M225 220A65 65 0 1 0 264 302 60 60 0 0 1 225 220Z" fill="currentColor" fill-opacity=".12"/>',
        noel_nam: star + '<path d="M15 318 52 248 38 248 75 190 112 248H98L135 318ZM265 318 302 248H288L325 190 362 248H348L385 318ZM75 318V352M325 318V352M115 290H250L277 265V312Q220 355 140 320ZM110 340Q175 382 290 327M146 322V350M240 325V348"/><path d="M148 287V250H182V287M190 287V240H229V287M165 250V287M210 240V287"/>',
        noel_nu: '<path d="M105 235Q117 214 117 170A83 83 0 0 1 283 170Q283 214 295 235ZM105 249H295M180 256Q200 290 220 256M200 87V52"/><path d="M200 70C120 0 102 90 200 70C298 90 280 0 200 70ZM200 70 152 128M200 70 248 128"/><path d="M62 300H158V375H62ZM50 285H170V307H50ZM110 285V375M243 310H339V385H243ZM231 295H351V317H231ZM291 295V385M110 284C53 242 63 306 110 284C155 306 171 244 110 284M291 295C234 253 244 317 291 295C336 317 352 255 291 295"/>'
    };
    // Premium scenes have separate architecture, foregrounds and choreography.
    // Regular pets/effects keep their existing art and inventory contracts.
    const wide = art => `<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">${art}</svg>`;
    const rays = (n, cx, cy, inner, outer) => many(n, i => `<path transform="rotate(${i*360/n} ${cx} ${cy})" d="M${cx} ${cy-inner}V${cy-outer}"/>`);
    const windows = (x, y, n, gap, height) => many(n, i => `<g transform="translate(${x+i*gap} ${y})"><path d="M0 ${height}V25Q18-14 36 25V${height}Z" fill="currentColor" fill-opacity=".07"/><path d="M7 ${height-7}V29Q18 5 29 29V${height-7}M18 10V${height}M0 ${height*.55}H36"/></g>`);
    const pine = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-150-42-85H-24L-65-15H-40L-90 65H90L40-15H65L24-85H42Z" fill="currentColor" fill-opacity=".17"/><path d="M0-150V105M-65 65H65M-44-15H44M-22-85H22"/></g>`;
    const gift = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40-24H40V45H-40ZM-48-36H48V-18H-48ZM0-36V45M0-35C-58-76-54-5 0-35C58-76 54-5 0-35Z" fill="currentColor" fill-opacity=".12"/></g>`;
    const gem = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-65 46-25 30 38 0 65-30 38-46-25Z" fill="currentColor" fill-opacity=".14"/><path d="M-46-25H46M0-65-20-25 0 65 20-25ZM-30 38H30"/></g>`;
    const gear = (x, y, radius, n = 16) => `<g transform="translate(${x} ${y})"><circle r="${radius}"/><circle r="${radius*.84}" stroke-dasharray="2 9"/>${many(n, i => `<path transform="rotate(${i*360/n})" d="M-9-${radius-5}V-${radius+17}H9V-${radius-5}"/>`)}${rays(8,0,0,radius*.15,radius*.8)}<circle r="${radius*.14}"/></g>`;
    const sceneBuilders = {
        alger: () => ({
            sky: '<circle cx="1080" cy="200" r="104"/><circle cx="1080" cy="200" r="116" stroke-dasharray="1 10"/>'+rays(24,1080,200,127,160),
            far: '<path d="M0 540 150 492 278 540 430 478 575 530 750 466 928 512 1150 455 1440 520V900H0Z" fill="currentColor" fill-opacity=".07"/><path d="M110 610V300Q110 105 340 56Q570 105 570 300V610M130 610V300Q130 125 340 78Q550 125 550 300V610M340 78V610M130 300H550"/>'+windows(160,325,5,70,230),
            near: many(12,i=>`<path style="--i:${i}" class="p4-tide-line" d="M-100 ${650+i*19}Q160 ${570+i*20} 420 ${650+i*19}T940 ${650+i*19}T1460 ${650+i*19}"/>`)+'<path d="M1030 600V285M1030 300 907 506H1030ZM1044 333 1156 506H1044ZM890 520H1170L1112 588H956ZM1012 585V617M948 623Q1020 644 1125 618" fill="currentColor" fill-opacity=".12"/>'+many(8,i=>`<path transform="translate(${30+i*190} 820)" d="M-70 0Q-35-50 0 0T70 0M0 0V30"/>`)
        }),
        emlyn: () => ({
            sky: '<circle cx="720" cy="260" r="142" fill="currentColor" fill-opacity=".12"/><path d="M785 127A142 142 0 1 0 848 324 125 125 0 0 1 785 127Z" fill="currentColor" fill-opacity=".32"/>',
            far: many(6,i=>`<path d="M${50+i*28} 900V${330-i*22}Q${50+i*28} ${40-i*8} 720 ${-120+i*27}Q${1390-i*28} ${40-i*8} ${1390-i*28} ${330-i*22}V900"/>`)+windows(80,270,4,90,500)+windows(1045,270,4,90,500),
            near: many(2,s=>`<g transform="translate(${s?1265:175} 350)"><circle r="120"/><circle r="107"/>${many(12,i=>`<g transform="rotate(${i*30})"><path d="M0 0Q-43-66 0-96Q43-66 0 0Z" fill="currentColor" fill-opacity="${i%2?'.2':'.06'}"/><path d="M0-25V-88"/></g>`)}</g>`)+many(14,i=>`<path d="M720 640 ${-900+i*250} 900"/>`)+'<path d="M0 830H1440M0 855H1440M0 885H1440"/>'+many(8,i=>`<g transform="translate(${75+i*184} ${790+(i%2)*48})"><path d="M-9 0V-58H9V0M0-58C-20-90 4-112 0-127C25-101 15-75 0-58Z" fill="currentColor" fill-opacity=".15"/></g>`)
        }),
        liu_xiao: () => ({
            sky: gear(1120,235,174,24)+gear(180,120,130,20),
            far: many(7,i=>`<g transform="translate(720 420) rotate(${(i-3)*6})"><rect x="${-540+i*37}" y="${-350+i*22}" width="${1080-i*74}" height="${700-i*44}" rx="4"/><path d="M${-510+i*35} ${-326+i*20}H${510-i*35}"/></g>`)+many(9,i=>`<path d="M${40+i*170} 0 ${160+i*125} 900" stroke-dasharray="2 12"/>`),
            near: '<path d="M0 520 270 465 352 562 520 419 650 502 805 347 952 454 1180 385 1440 410M0 530 270 475 352 572 520 429 650 512 805 357 952 464 1180 395 1440 420"/>'+gear(190,760,182,20)+gear(1290,790,240,28)+many(9,i=>`<g transform="translate(${60+i*169} ${70+(i%3)*210}) rotate(${i*13-40})"><path d="M-30-48H30V48H-30Z" fill="currentColor" fill-opacity=".07"/><path d="M0-36V0L19 12M-20 34H20"/></g>`)
        }),
        qiao_ling: () => ({
            sky: '<path d="M80 60Q450 200 720 135T1360 70M80 76Q450 216 720 151T1360 86"/>'+many(18,i=>`<circle cx="${90+i*73}" cy="${90+Math.sin(i/3)*45}" r="4" fill="currentColor"/>`),
            far: '<path d="M0 900 480 530V120H960V530L1440 900M480 530H960M480 120 0 0M960 120 1440 0M720 120V530"/>'+many(5,i=>`<path d="M${60+i*94} ${30+i*18}V${850-i*65}M${1380-i*94} ${30+i*18}V${850-i*65}"/>`)+windows(600,260,3,70,245),
            near: many(8,i=>`<g class="p4-memory-panel" style="--i:${i}" transform="translate(${i%2?1160-(i%3)*36:130+(i%3)*42} ${195+Math.floor(i/2)*180}) rotate(${i%2?12:-12})"><rect x="-78" y="-90" width="156" height="195" rx="3" fill="currentColor" fill-opacity=".05"/><path d="M-66-78H66V65H-66ZM-60 52-19-10 10 25 35-20 61 52M-52 84H40"/><circle cx="35" cy="-43" r="15"/></g>`)+many(10,i=>`<path d="M${-1000+i*350} 900 720 530"/>`)
        }),
        hemera: () => ({
            sky: '<circle cx="720" cy="230" r="112" fill="currentColor" fill-opacity=".1"/><circle cx="720" cy="230" r="124"/>'+rays(48,720,230,140,235),
            far: '<path d="M255 350 720 120 1185 350ZM300 350H1140V384H300ZM280 740H1160V765H280ZM240 765H1200V792H240ZM200 792H1240V825H200Z" fill="currentColor" fill-opacity=".08"/>'+many(8,i=>`<g transform="translate(${355+i*98} 385)"><path d="M-23 0H23V20H-23ZM-17 20V350H17V20M-10 35V335M10 35V335M-26 350H26V370H-26Z"/></g>`),
            near: many(7,i=>`<path class="p4-solar-cloud" style="--i:${i}" d="M${-180+i*280} ${580+(i%3)*98}q-65-30-30-63q38-32 71 3q18-70 76-45q42 20 27 55q65-25 83 20q8 30-42 30Z" fill="currentColor" fill-opacity=".06"/>`)+many(2,s=>`<g transform="translate(${s?1340:100} 650) scale(${s?-1:1} 1)"><path d="M0 200Q-30 40 55-160M55-160C-35-148-78-90 17-75M35-111C115-145 129-86 25-50M10-55C-75-55-78 13 0 12M1-5C100-29 111 51 1 60M0 57C-85 60-65 132 5 117M4 105C77 83 101 165 7 168"/></g>`)
        }),
        greed: () => ({
            sky: gem(720,220,2.3)+rays(32,720,220,174,225),
            far: '<path d="M100 900V230L270 60H1170L1340 230V900M160 900V250L300 110H1140L1280 250V900M300 110V740M1140 110V740M160 250H1280M160 740H1280"/>'+many(7,i=>`<path d="M${210+i*170} 250V740"/>`)+many(2,s=>`<g transform="translate(${s?1180:260} 420)"><circle r="150"/><circle r="128"/>${rays(20,0,0,105,125)}<path d="M-80 0H80M0-80V80"/><circle r="36"/></g>`),
            near: '<path d="M525 730V330L600 405 720 310 840 405 915 330V730M555 710V450H885V710M500 740H940V780H500ZM465 790H975V830H465Z" fill="currentColor" fill-opacity=".1"/>'+many(12,i=>gem(65+i*120,790+(i%3)*32,.45+(i%2)*.15))+many(16,i=>`<g transform="translate(${25+i*93} ${865-(i%4)*17})"><ellipse rx="42" ry="12" fill="currentColor" fill-opacity=".12"/><path d="M-42 0V12Q0 38 42 12V0M-42-7Q0 20 42-7"/></g>`)
        }),
        noctyriel: () => ({
            sky: '<circle cx="720" cy="280" r="177" fill="currentColor" fill-opacity=".07"/><circle cx="720" cy="280" r="190" stroke-dasharray="1 9"/><path d="M792 122A176 176 0 1 0 868 376 159 159 0 0 1 792 122Z" fill="currentColor" fill-opacity=".2"/><ellipse cx="720" cy="280" rx="400" ry="95" transform="rotate(-22 720 280)"/><ellipse cx="720" cy="280" rx="350" ry="78" transform="rotate(22 720 280)"/>',
            far: many(11,i=>`<g transform="translate(${25+i*142} ${580+(i%3)*55})"><path d="M-36 200V-90L0-190 36-90V200M0-190V200M-36-90H36M-24-60V160M24-60V160" fill="currentColor" fill-opacity=".08"/></g>`)+many(20,i=>`<path d="M${(i*173+40)%1400} ${35+(i*73)%430}l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="currentColor" fill-opacity=".3"/>`),
            near: '<path d="M-50 900Q50 470 320 250M1490 900Q1390 470 1120 250M-35 900Q70 500 330 270M1475 900Q1370 500 1110 270"/>'+many(5,i=>`<ellipse cx="720" cy="${770+i*31}" rx="${260+i*100}" ry="${30+i*10}"/>`)+'<path d="M530 730 505 635 595 678 650 605 720 660 790 605 845 678 935 635 910 730ZM540 748H900" fill="currentColor" fill-opacity=".1"/>'
        }),
        noel_nam: () => ({
            sky: many(5,i=>`<path class="p4-aurora-band" style="--i:${i}" d="M-100 ${110+i*30}Q260 ${-160+i*44} 600 ${120+i*18}T1540 ${50+i*40}" stroke-width="${8+i*7}" opacity="${.12-i*.015}"/>`)+ '<path d="M1080 65 1099 124 1160 145 1099 166 1080 225 1061 166 1000 145 1061 124Z" fill="currentColor" fill-opacity=".3"/>',
            far: many(12,i=>pine(i*138-40,580+(i%3)*34,.85+(i%3)*.22))+many(6,i=>`<g transform="translate(${400+i*113} ${590-(i%2)*40})"><path d="M-35 50V-18L0-51 35-18V50ZM-45-15 0-60 45-15M-19 50V18H-3V50M10 8H25V24H10Z" fill="currentColor" fill-opacity=".12"/></g>`),
            near: '<path d="M0 780Q240 680 550 768T1440 725M0 850Q450 720 850 835T1440 800M0 885Q450 830 850 875T1440 850"/>'+pine(110,735,1.6)+pine(1330,720,1.7)+'<g class="p4-sleigh"><path d="M470 600H765L820 550V640Q700 729 520 647ZM470 688Q650 780 855 650M535 651V707M740 661V701" fill="currentColor" fill-opacity=".12"/>'+gift(555,550,.8)+gift(655,535,1)+gift(735,548,.75)+'</g>'
        }),
        noel_nu: () => ({
            sky: '<path d="M200 0Q720 480 1240 0M320 0Q720 365 1120 0M440 0Q720 250 1000 0"/>'+many(15,i=>`<g transform="translate(${250+i*67} ${45+Math.sin(i/14*Math.PI)*130})"><path d="M0-75V0M0 0 9 20 0 45-9 20Z" fill="currentColor" fill-opacity=".18"/></g>`),
            far: many(5,i=>`<path d="M${100+i*37} 900V${300+i*9}Q${100+i*37} ${-50+i*28} 720 ${40+i*28}Q${1340-i*37} ${-50+i*28} ${1340-i*37} ${300+i*9}V900"/>`)+windows(110,335,3,95,400)+windows(1100,335,3,95,400)+'<circle cx="720" cy="310" r="135"/>'+rays(12,720,310,112,124)+'<path d="M720 205V310L783 351M720 447V555M670 535Q720 581 770 535"/>',
            near: many(10,i=>gift(65+i*146,800+(i%3)*28,.8+(i%2)*.4))+'<path d="M0 710Q200 610 360 715T720 715T1080 715T1440 715M0 735Q200 635 360 740T720 740T1080 740T1440 740"/>'+many(2,s=>`<g transform="translate(${s?1280:160} 580)"><path d="M-62 0Q-52-30-52-90A52 52 0 0 1 52-90Q52-30 62 0ZM-62 15H62M-15 22Q0 47 15 22M0-142V-183M0-165C-95-235-85-113 0-165C95-235 85-113 0-165Z" fill="currentColor" fill-opacity=".12"/></g>`)
        })
    };
    const sceneCache = new Map();
    function landscape(k) {
        if (!sceneCache.has(k)) sceneCache.set(k, sceneBuilders[k]());
        return sceneCache.get(k);
    }
    // The original character and themed relic share the cinematic stage.
    const relicBuilders = {
        alger: fill => `<g class="p4-relic-slow-spin">${gear(500,320,260,32)}</g><g class="p4-relic-float"><path d="M195 435Q500 535 820 410L748 520Q495 603 280 520Z" fill="${fill}" stroke-width="2.5"/><path d="M242 475Q500 556 775 458M280 505Q500 570 748 500M500 460V95M315 450V195M665 444V155M500 120 348 385H500ZM520 145 664 380H520ZM315 223 223 395H315ZM676 181 776 382H676Z" fill="${fill}"/><path d="M500 95 570 123 500 149M315 195 368 218 315 237M665 155 723 180 665 198" fill="currentColor" fill-opacity=".25"/>${many(9,i=>`<circle cx="${330+i*42}" cy="${511+Math.sin(i/8*Math.PI)*20}" r="7"/>`)}<path d="M200 435 500 95 820 410M315 195 500 460 665 155M260 482 280 520M720 488 715 535" stroke-opacity=".6"/></g>${many(6,i=>`<path class="p4-relic-wave" style="--i:${i}" d="M20 ${560+i*21}Q160 ${485+i*24} 350 ${555+i*21}T690 ${555+i*21}T1030 ${555+i*21}"/>`)}`,
        emlyn: fill => `<g class="p4-relic-slow-spin"><circle cx="500" cy="280" r="237"/>${many(16,i=>`<g transform="rotate(${i*22.5} 500 280)"><path d="M500 60Q450 104 500 164Q550 104 500 60Z" fill="${fill}"/><path d="M500 77V148"/></g>`)}</g><circle cx="500" cy="280" r="145" fill="${fill}"/><path d="M558 148A144 144 0 1 0 626 350 127 127 0 0 1 558 148Z" fill="currentColor" fill-opacity=".5"/><g class="p4-relic-float"><path d="M380 300H620Q610 443 525 461V555L600 590H400L475 555V461Q390 443 380 300Z" fill="${fill}" stroke-width="2.5"/><path d="M400 322H600Q586 413 500 430Q414 413 400 322ZM500 430V555M440 573H560M417 590V606H583V590M380 300Q500 335 620 300M415 365 448 394 469 356 500 407 531 356 552 394 585 365"/></g>${many(10,i=>`<path class="p4-relic-ember" style="--i:${i}" transform="translate(${180+i*72} ${500-(i%3)*40})" d="M0 0Q-28-26 0-51Q28-26 0 0Z" fill="currentColor" fill-opacity=".3"/>`)}`,
        liu_xiao: fill => `<g class="p4-relic-slow-spin">${gear(500,340,274,28)}</g><g class="p4-relic-counter-spin">${gear(500,340,224,20)}</g><g class="p4-hourglass"><path d="M370 125H630V151H370ZM370 535H630V561H370ZM397 151Q400 257 476 322Q488 340 476 358Q400 422 397 535H603Q600 422 524 358Q512 340 524 322Q600 257 603 151Z" fill="${fill}" stroke-width="2.5"/><path d="M415 170H585Q575 233 500 301Q425 233 415 170ZM420 516Q435 455 500 410Q565 455 580 516ZM500 310V403" fill="currentColor" fill-opacity=".14"/><path d="M385 151V535M615 151V535" stroke-width="5"/></g>${many(12,i=>`<g class="p4-relic-shard" style="--i:${i}" transform="translate(${500+Math.cos(i*Math.PI/6)*344} ${340+Math.sin(i*Math.PI/6)*250}) rotate(${i*30})"><path d="M-17-35H17L29 25-12 39-28-5Z" fill="${fill}"/></g>`)}`,
        qiao_ling: fill => `<g class="p4-relic-slow-spin"><ellipse cx="500" cy="350" rx="310" ry="200" transform="rotate(-20 500 350)"/><ellipse cx="500" cy="350" rx="310" ry="200" transform="rotate(20 500 350)"/></g>${many(8,i=>`<g class="p4-memory-panel" style="--i:${i}" transform="translate(${500+Math.cos(i*Math.PI/4)*300} ${330+Math.sin(i*Math.PI/4)*220}) rotate(${i%2?12:-12})"><rect x="-59" y="-76" width="118" height="150" rx="4" fill="${fill}"/><path d="M-49-65H49V40H-49ZM-43 31-10-10 12 12 31-18 44 31M-38 57H30"/><circle cx="27" cy="-43" r="11"/></g>`)}<g class="p4-relic-float"><path d="M356 292H401L424 245H576L599 292H644V456H356Z" fill="${fill}" stroke-width="2.5"/><path d="M370 308H630V440H370M392 320H428M580 319H610M452 263H548"/><circle cx="500" cy="371" r="93" fill="${fill}"/><circle cx="500" cy="371" r="73"/><circle cx="500" cy="371" r="55"/>${many(8,i=>`<path transform="rotate(${i*45} 500 371)" d="M500 315 540 343 529 389 500 420"/>`)}</g>`,
        hemera: fill => `<g class="p4-relic-slow-spin">${rays(48,500,300,165,270)}<circle cx="500" cy="300" r="153"/><circle cx="500" cy="300" r="170" stroke-dasharray="2 7"/></g><circle cx="500" cy="300" r="125" fill="${fill}" stroke-width="2"/><circle cx="500" cy="300" r="95" fill="currentColor" fill-opacity=".14"/>${many(2,s=>`<g class="p4-solar-wing" style="--side:${s?1:-1}" transform="translate(500 340) scale(${s?-1:1} 1)"><path d="M-100 55Q-290 20-390-205Q-185-163-100 55Z" fill="${fill}"/>${many(10,i=>`<path d="M-110 48Q${-250+i*8} ${-35-i*9} ${-375+i*21} ${-185+i*9}"/>`)}</g>`)}<g class="p4-relic-float"><path d="M340 570V438Q340 350 500 350Q660 350 660 438V570M365 570V442Q365 375 500 375Q635 375 635 442V570M310 580H690V610H310ZM280 620H720V644H280Z" fill="${fill}"/><path d="M388 570V445M612 570V445M445 392V570M555 392V570"/></g>`,
        greed: fill => `<g class="p4-relic-slow-spin"><circle cx="500" cy="330" r="280"/>${rays(32,500,330,258,274)}</g><path d="M260 588V170L335 95H665L740 170V588ZM285 565V180L347 122H653L715 180V565Z" fill="${fill}" stroke-width="2"/><g class="p4-vault-door p4-vault-left"><path d="M300 540V190L355 140H498V540Z" fill="${fill}"/><path d="M320 520V200L365 162H475V520Z"/><circle cx="446" cy="350" r="17"/></g><g class="p4-vault-door p4-vault-right"><path d="M502 540V140H645L700 190V540Z" fill="${fill}"/><path d="M525 520V162H635L680 200V520Z"/><circle cx="554" cy="350" r="17"/></g><g class="p4-relic-float p4-vault-heart">${gem(500,320,2.4)}<ellipse cx="500" cy="520" rx="100" ry="22"/></g>${many(14,i=>`<g class="p4-relic-coin" style="--i:${i}" transform="translate(${85+i*65} ${580+(i%3)*23})"><ellipse rx="26" ry="9" fill="${fill}"/><path d="M-26 0V11Q0 31 26 11V0M0-7V7"/></g>`)}`,
        noctyriel: fill => `<g class="p4-relic-slow-spin"><circle cx="500" cy="320" r="235" stroke-dasharray="1 10"/>${rays(24,500,320,244,262)}</g><g class="p4-relic-counter-spin"><ellipse cx="500" cy="320" rx="350" ry="96" transform="rotate(-28 500 320)"/><ellipse cx="500" cy="320" rx="350" ry="96" transform="rotate(28 500 320)"/></g><circle cx="500" cy="320" r="185" fill="${fill}" stroke-width="3"/><circle cx="500" cy="320" r="174" fill="var(--p4-dark)"/><path d="M574 163A177 177 0 0 1 574 477 168 168 0 0 0 574 163Z" fill="currentColor" fill-opacity=".5"/><g class="p4-relic-float"><path d="M352 210 320 100 410 151 454 72 500 139 546 72 590 151 680 100 648 210ZM360 225H640V244H360Z" fill="${fill}" stroke-width="2"/>${gem(500,191,.45)}</g>${many(16,i=>`<path class="p4-relic-ember" style="--i:${i}" transform="translate(${500+Math.cos(i*Math.PI/8)*300} ${320+Math.sin(i*Math.PI/8)*245})" d="M0-9 3-3 9 0 3 3 0 9-3 3-9 0-3-3Z" fill="currentColor"/>`)}`,
        noel_nam: fill => `<g class="p4-relic-slow-spin">${rays(24,500,260,90,220)}<circle cx="500" cy="260" r="79"/></g><path d="M500 123 528 211 620 241 528 271 500 359 472 271 380 241 472 211Z" fill="${fill}"/><g class="p4-relic-sleigh"><path d="M230 425H642L742 355V460Q620 588 310 478ZM235 522Q500 658 800 450M330 490V559M630 499V548M280 460Q500 535 686 433" fill="${fill}" stroke-width="2.5"/>${gift(385,390,1.25)}${gift(500,365,1.6)}${gift(618,389,1.05)}<path d="M260 523Q175 520 196 462Q221 431 248 464M780 473Q858 420 821 388Q796 369 778 398"/></g>${many(16,i=>`<g class="p4-relic-snow" style="--i:${i}" transform="translate(${80+(i*137)%870} ${80+(i*87)%570})"><path d="M-8 0H8M0-8V8M-6-6 6 6M-6 6 6-6"/></g>`)}`,
        noel_nu: fill => `<g class="p4-relic-slow-spin"><circle cx="500" cy="310" r="265" stroke-dasharray="2 9"/>${rays(24,500,310,245,259)}</g><g class="p4-relic-bell"><path d="M354 406Q386 360 386 250A114 114 0 0 1 614 250Q614 360 646 406ZM350 420H650V442H350ZM473 449Q500 500 527 449M500 136V100" fill="${fill}" stroke-width="2.5"/><path d="M400 386Q422 340 420 260M600 386Q578 340 580 260M500 100C327-28 317 202 500 100C673-28 683 202 500 100ZM500 100 427 213M500 100 573 213" fill="${fill}"/><path d="M395 348Q500 298 605 348M393 370Q500 320 607 370"/></g>${gift(290,530,1.3)}${gift(500,571,1.6)}${gift(710,530,1.3)}${many(8,i=>`<path class="p4-relic-ember" style="--i:${i}" transform="translate(${180+i*93} ${160+(i%3)*95})" d="M0-13 4-4 13 0 4 4 0 13-4 4-13 0-4-4Z" fill="currentColor"/>`)}`
    };
    function premiumRelic(k) {
        const id = `p4-relic-metal-${k}`;
        return `<svg class="p4-relic-svg" viewBox="0 0 1000 720" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--p4-accent)" stop-opacity=".48"/><stop offset=".38" stop-color="var(--p4-dark)" stop-opacity=".97"/><stop offset=".7" stop-color="var(--p4-gold)" stop-opacity=".42"/><stop offset="1" stop-color="var(--p4-dark)"/></linearGradient></defs>${relicBuilders[k](`url(#${id})`)}</svg>`;
    }
    function premiumWorld(k) {
        const s = landscape(k);
        return `<div class="p4-atmosphere"></div><div class="p4-scene-sky">${wide(s.sky)}</div><div class="p4-scene-far">${wide(s.far)}</div><div class="p4-scene-near">${wide(s.near)}</div><div class="p4-scene-border"><i></i><i></i><i></i><i></i></div><div class="p4-world-emblem">${scene(k)}</div>${dust(26)}<div class="p4-vignette"></div>`;
    }
    function premiumAura(k) {
        return `<div class="p4-realm-gateway">${scene(k)}</div><div class="p4-realm-orbits"><i></i><i></i><i></i></div><div class="p4-realm-columns"><i></i><i></i></div><div class="p4-realm-floor">${svg('<ellipse cx="200" cy="200" rx="172" ry="62"/><ellipse cx="200" cy="200" rx="144" ry="45" stroke-dasharray="2 6"/>'+rays(24,200,200,77,87))}</div><div class="p4-realm-signature"><span>${designs[k][0]}</span><i></i></div>${dust(8)}`;
    }
    function premiumUltimate(k) {
        const s = landscape(k), d = designs[k];
        return `<div class="p4-curtain p4-cinematic-curtain"></div><div class="p4-film-bars"><i></i><i></i></div><div class="p4-ult-sky">${wide(s.sky)}</div><div class="p4-ult-architecture">${wide(s.far)}</div><div class="p4-ult-foreground">${wide(s.near)}</div><div class="p4-ult-beams">${many(5,i=>`<i style="--i:${i}"></i>`)}</div><div class="p4-ult-sigil">${scene(k)}</div><div class="p4-ult-shockwave"><i></i><i></i></div><div class="p4-ult-relic" data-relic="${k}">${premiumRelic(k)}</div><div class="p4-ult-flourish">${scene(k)}</div><div class="p4-title p4-cinematic-title"><small>${d[0]}</small><strong>${d[1]}</strong><span>${d[5]}</span><div class="p4-story-progress"><i></i></div></div>${dust(32)}<div class="p4-vignette"></div>`;
    }
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const paused = () => document.hidden || !!window.currentActiveExamId || window.isExamVisualItemsSuspended === true || document.body.classList.contains('exam-active');
    const quiet = () => motion.matches || window.EffectQualityManager?.getLuxuryPolicy?.().level === 'low' || document.body.classList.contains('wfx-low-power');
    const count = n => quiet() ? 0 : Math.max(0, Math.min(n, window.EffectQualityManager?.getRecommendedCount?.(n) ?? n));
    const keyOf = id => Object.keys(designs).find(k => id === `pet_plan4_${k}` || id === `pet_plan4_${k}_premium`);
    function ensureCSS() {
        let link = document.getElementById('plan4-css');
        if (!link) { link = document.createElement('link'); link.id = 'plan4-css'; link.rel = 'stylesheet'; link.href = CSS; document.head.append(link); }
        if (!document.getElementById('plan4-theme-experience-css')) {
            const theme = document.createElement('link'); theme.id = 'plan4-theme-experience-css';
            theme.rel = 'stylesheet'; theme.href = 'css/plan4-theme-experience.css?v=20261108.clean1'; document.head.append(theme);
        }
        return link;
    }
    function scene(key) { return svg(art[key]); }
    function dust(n) { return many(count(n), i => `<i class="p4-dust" style="--i:${i};--x:${(i*37+3)%100}%;--y:${(i*23+11)%100}%"></i>`); }
    // Shadow DOM keeps item decoration separate from content and user theme styles.
    function host(key, cls, html, parent = document.body) {
        const e = document.createElement('div'); e.className = `p4-host ${cls}`; e.dataset.design = key; e.setAttribute('aria-hidden', 'true');
        const d = designs[key]; e.style.cssText = `--p4-accent:${d[2]};--p4-dark:${d[3]};--p4-gold:${d[4]};pointer-events:none!important;`;
        e.style.visibility = 'hidden';
        const shadow = e.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<link rel="stylesheet" href="${CSS}"><div class="p4-root" style="display:none">${html}</div>`;
        const link = shadow.querySelector('link'), root = shadow.querySelector('.p4-root');
        let settled = false, timer;
        const outer = ensureCSS(), links = [outer, link], ready = new Set();
        e.p4Ready = new Promise(resolve => {
            const finish = ok => {
                if (settled) return; settled = true; clearTimeout(timer);
                links.forEach(l => { l.removeEventListener('load', loaded); l.removeEventListener('error', failed); });
                if (ok && e.isConnected) { root.style.display = ''; e.style.visibility = ''; }
                else e.remove();
                resolve(ok && e.isConnected);
            };
            const loaded = event => { ready.add(event.target); if (ready.size === links.length) finish(true); };
            const failed = event => { if (event.target === outer) outer.remove(); finish(false); };
            e.p4Cancel = () => finish(false);
            links.forEach(l => { l.addEventListener('load', loaded); l.addEventListener('error', failed); if (l.sheet) ready.add(l); });
            parent.append(e);
            timer = setTimeout(() => { if (!outer.sheet) outer.remove(); finish(false); }, 12000);
            if (ready.size === links.length) finish(true);
        });
        return e;
    }
    let pet = null, key = '', premium = false, world = null, aura = null, events = null, observer = null, flags = null, frame = 0, cooldown = 0, lastClick = -Infinity;
    let saved = {}, tagged = new Set(), transients = new Set(), timers = new Set(), cinematic = null, sampleFrame = 0, finishLoading = null;
    let arrivals = [], lastArrival = '';
    function stopArrival() { arrivals.forEach(a => a.cancel()); arrivals = []; }
    const entrances = {
        alger:['translate(-28%,12%) rotate(-6deg)','inset(80% 0 0 0)','translate(4%,-3%) rotate(2deg)'],
        emlyn:['translateX(28%)','polygon(45% 0,55% 0,55% 100%,45% 100%)','translateX(-3%)'],
        liu_xiao:['translateX(32%) skewX(-10deg)','inset(0 80% 0 0)','translateX(-8%) skewX(5deg)'],
        qiao_ling:['perspective(420px) rotateY(-65deg) rotate(-8deg)','inset(5% 0 8% 0)','perspective(420px) rotateY(10deg)'],
        hemera:['translateY(35%)','inset(0 0 88% 0)','translateY(-4%)'],
        greed:['translateY(-20%)','polygon(50% 15%,60% 50%,50% 80%,40% 50%)','translateY(4%)'],
        noctyriel:['rotate(-7deg)','circle(6% at 50% 22%)','rotate(2deg)'],
        noel_nam:['translate(75%,-45%) rotate(14deg)','inset(0 0 0 0)','translate(-6%,4%) rotate(-4deg)'],
        noel_nu:['translate(-38%,12%) rotate(-20deg)','ellipse(15% 50% at 50% 50%)','translate(6%,-3%) rotate(5deg)']
    };
    function enter(id, signal) {
        if (lastArrival === id || !navigator.userActivation?.isActive || quiet() || paused()) return;
        const img = pet;
        img.decode().then(() => {
            if (signal.aborted || pet !== img || cinematic || quiet() || hiddenPet()) return;
            const [start, mask, accent] = entrances[key];
            lastArrival = id;
            const timing = {duration:premium ? 1250 : 750,easing:'cubic-bezier(.18,.72,.22,1)'};
            arrivals.push(img.animate([{transform:start,clipPath:mask},{offset:.72,transform:accent,clipPath:'inset(0)'},{transform:'none',clipPath:'inset(0)'}],timing));
            const gateway = aura?.shadowRoot.querySelector('.p4-realm-gateway,.p4-pet-seal');
            if (gateway) arrivals.push(gateway.animate([{clipPath:'inset(0 48%)'},{clipPath:'inset(0)'}],timing));
        }).catch(() => {});
    }
    const immune = '.ui-theme-immune,.store-theme-locked,[data-theme-immune="true"],#virtual-pet-container';
    function markInterface() {
        if (!premium) return;
        document.querySelectorAll('.sidebar,.modal-content,.popup-content,.assignment-card,.stat-card,.dashboard-card').forEach(e => {
            if (e.closest(immune) || e.classList.contains('p4-surface')) return;
            e.classList.add('p4-surface'); tagged.add(e);
        });
    }
    function finishCinematic() {
        finishLoading?.(); finishLoading = null;
        cancelAnimationFrame(sampleFrame); sampleFrame = 0;
        cinematic = null;
        // Removing an absent class still mutates the attribute in the browser.
        // The root observer calls sync(), so write only when the state changes.
        if (document.documentElement.classList.contains('p4-cinematic-active')) document.documentElement.classList.remove('p4-cinematic-active');
    }
    function clearTransient(preserveUnity) { if (preserveUnity !== true) window.Plan4Unity?.stop(); transients.forEach(e => { e.p4Cancel?.(); e.remove(); }); transients.clear(); timers.forEach(clearTimeout); timers.clear(); finishCinematic(); }
    function later(fn, ms) { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); }
    function transient(cls, html, ms) {
        const e = host(key, cls, html); transients.add(e);
        e.p4Ready.then(ok => {
            if (!ok || !e.isConnected) { transients.delete(e); return; }
            if (ms) later(() => { e.remove(); transients.delete(e); }, ms);
        });
        return e;
    }
    function hiddenPet() { return paused() || !pet?.isConnected || pet.parentElement.hidden || pet.parentElement.style.display === 'none'; }
    function sync() {
        if (!pet?.isConnected) { clearPet(); return; }
        const hidden = hiddenPet(), still = quiet();
        for (const e of [world, aura]) if (e) { e.hidden = hidden; e.shadowRoot.querySelector('.p4-root').classList.toggle('p4-still', still); }
        if (document.documentElement.classList.contains('p4-suspended') !== hidden) document.documentElement.classList.toggle('p4-suspended', hidden);
        if (hidden || still) { stopArrival(); window.Plan4Unity?.stop(); }
        // Low quality keeps an explicitly requested short skill; reduced motion and exams still stop it.
        if (hidden || motion.matches || (still && cinematic?.classList.contains('p4-cinematic'))) clearTransient();
    }
    // One gesture per set; the same mark returns at the margins of its equipped weather.
    const gestures = {
        alger:'M8 58Q26 43 46 58T88 58 M14 67Q32 53 51 66T83 66 M50 17V48L43 39M50 48L57 39',
        emlyn:'M50 49Q15 12 31 57L50 64Q79 61 76 27Q64 25 50 49ZM50 64Q41 50 48 40Q64 36 60 51Z',
        liu_xiao:'M11 64H35L57 38H87 M31 64H54L72 78H89 M40 28V41M48 23V36M56 26V32',
        qiao_ling:'M12 40V20H35M64 20H86V40M86 58V80H65M34 80H12V58 M24 62L42 42L54 53L67 39L76 62',
        hemera:'M18 70H82M24 63H76M31 55A19 19 0 0 1 69 55 M50 12V27M17 30L29 38M83 30L71 38',
        greed:'M18 38L34 23H66L82 38L50 77Z M18 38H82M35 24L40 38L50 77L60 38L65 24',
        noctyriel:'M12 67C8 44 77 12 86 33S24 87 12 67ZM59 29A22 22 0 1 0 66 65A21 21 0 0 1 59 29Z',
        noel_nam:'M8 77Q45 76 63 43T92 12 M69 16L72 27L83 30L72 33L69 45L66 33L55 30L66 27Z',
        noel_nu:'M50 43C8 7 10 67 50 43C93 8 91 65 50 43ZM50 43C41 52 43 69 27 82M50 43C58 54 56 65 74 76'
    };
    function mark(k) {
        return `<svg class="p4-gesture" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${gestures[k]}" pathLength="1"/></svg>`;
    }

    function clickParticles(k) {
        const kinds=['alger','emlyn','liu_xiao','qiao_ling','hemera','greed','noctyriel','noel_nam','noel_nu'];
        const kind=kinds.indexOf(k);
        return '<i class="p4-click-core"></i><i class="p4-click-ripple"></i>'+many(quiet() ? 6 : 18,i=>{
            const a=i*Math.PI*2/18, r=24+(i%4)*10;
            let x=Math.cos(a)*r,y=Math.sin(a)*r;
            if(kind===0){x=(i-8.5)*6;y=Math.sin(i*.8)*18-12;}
            if(kind===1){x=Math.sin(a)*r*.7;y=Math.cos(a)*r-12;}
            if(kind===2){x=(i%2?1:-1)*(22+i*2);y=(i%3-1)*14;}
            if(kind===3){x=Math.cos(a)*r*.8;y=-18-i*2;}
            if(kind===4){x=(i-8.5)*4;y=-20-Math.sin(i/17*Math.PI)*40;}
            if(kind===5){x=Math.sign(x)*(18+(i%3)*12);y=Math.sin(a)*r;}
            if(kind===6){x=Math.cos(a)*r;y=Math.sin(a)*r*.45;}
            if(kind===7){x=(i-8.5)*5;y=-15-Math.sin(i*.4)*25;}
            if(kind===8){x=Math.sin(a)*r;y=Math.sin(a*2)*r*.65;}
            const angle=Math.atan2(y,x)*180/Math.PI;
            return '<i class="p4-click-mote" style="--dx:'+x+'px;--dy:'+y+'px;--angle:'+angle+'deg;--length:'+(i%3===0?18:7)+'px;--delay:'+(i%3)*18+'ms"></i>';
        });
    }
    function clickAt(x, y) {
        if (!premium || cinematic || hiddenPet() || motion.matches || performance.now()-lastClick < 220) return false;
        lastClick = performance.now();
        if (!quiet() && unityEnabled()) {
            if (window.Plan4Unity?.click?.(key,x,y)) return true;
            loadUnity();
        }
        // Bound transient DOM even on rapid clicks and long-lived pages.
        if (document.querySelectorAll('.p4-click').length >= 5) return false;
        const e = transient('p4-click p4-premium-click', clickParticles(key), 850); e.style.left = x+'px'; e.style.top = y+'px'; return true;
    }
    const sequences = {
        alger:[0,1000,2400,4100,6800,8100,9500], emlyn:[0,1200,2700,4200,6500,7900,9300],
        liu_xiao:[0,800,2200,3600,6000,7400,8800], qiao_ling:[0,1100,2600,4400,6900,8400,9800],
        hemera:[0,1300,2900,4500,7100,8600,10200], greed:[0,900,2300,3900,6500,7800,9200],
        noctyriel:[0,1400,3000,4600,7200,9000,10800], noel_nam:[0,800,2000,3700,6200,7600,9000],
        noel_nu:[0,1000,2500,4000,6600,8100,9600]
    };
    let unityLoader;
    const unityEnabled = () => /^https?:$/.test(location.protocol) && document.querySelector('meta[name="plan4-unity"][content="enabled"]');
    function loadUnity() {
        if (!unityLoader) unityLoader = new Promise((resolve,reject) => {
            const script = document.createElement('script');
            script.src = 'assets/plan4-unity/plan4-unity.js?v=20261107.plan4input1';
            script.onload = () => resolve(window.Plan4Unity);
            script.onerror = () => { script.remove(); reject(Error('Unity adapter unavailable')); };
            document.head.append(script);
        }).catch(() => { unityLoader = null; return null; });
        return unityLoader;
    }
    function playUnityIfAvailable(host, design, duration) {
        if (!unityEnabled()) return;
        const started = performance.now();
        loadUnity().then(player => {
            if (cinematic === host && host.isConnected && !quiet() && !hiddenPet()) player?.attach(host,design,duration,started);
        }).catch(() => {});
    }
    function ultimate() {
        if (!pet || hiddenPet() || motion.matches || cinematic || performance.now() < cooldown || pet.parentElement.dataset.petDragged === '1') return false;
        stopArrival();
        clearTransient(true);
        const fullScene = premium && !quiet();

        const times = fullScene ? sequences[key] : sequences[key].map(t => Math.round(t * 3600 / sequences[key][6]));
        const content = fullScene ? premiumUltimate(key) : `<div class="p4-curtain"></div><div class="p4-short-emblem">${scene(key)}</div><div class="p4-title"><small>${designs[key][0]}</small><strong>${designs[key][1]}</strong></div>`;
        const e = transient(`p4-ultimate p4-story ${fullScene ? 'p4-cinematic' : 'p4-short-story'}`, content, 0);
        cinematic = e; e.dataset.renderer = 'web-vfx'; e.style.setProperty('--p4-duration', times[6]+'ms');
        finishLoading = window.LoadingStatus?.begin('hiệu ứng Ultimate');
        e.p4Ready.then(ok => {
            if (cinematic !== e) return;
            finishLoading?.(); finishLoading = null;
            if (!ok) { clearTransient(); window.showToast?.('Không tải được hiệu ứng. Hãy bấm lại để thử.'); return; }
            if (hiddenPet() || motion.matches || (fullScene && quiet())) { clearTransient(); return; }
            cooldown = performance.now() + (fullScene ? 16000 : 6000);
            later(() => { e.remove(); transients.delete(e); finishCinematic(); }, times[6]);
            // Keep the central effect when the device struggles with animated scenery.
            let previousFrame = performance.now(), elapsed = 0, samples = 0;
            function sampleCost(now) {
                if (!e.isConnected || cinematic !== e) return;
                elapsed += now - previousFrame; previousFrame = now; samples++;
                if (samples === 6) {
                    if (elapsed > 210) e.classList.add('p4-light-scene');
                    return;
                }
                sampleFrame = requestAnimationFrame(sampleCost);
            }
            sampleFrame = requestAnimationFrame(sampleCost);
            const root = e.shadowRoot.querySelector('.p4-root');
            const portal = document.createElement('div'); portal.className = 'p4-story-portal'; portal.innerHTML = '<i></i><i></i>'; root.append(portal);
            const names = ['summon','transition','reveal','crescendo','signature','fade'];
            e.dataset.phase = names[0];
            names.slice(1).forEach((phase, index) => later(() => { if (cinematic === e && e.isConnected) e.dataset.phase = phase; }, times[index+1]));
            document.documentElement.classList.add('p4-cinematic-active');
            if (fullScene) playUnityIfAvailable(e, key, times[6]);
        });
        return true;
    }
    function clearPet() {
        stopArrival();
        events?.abort(); observer?.disconnect(); flags?.disconnect(); cancelAnimationFrame(frame); frame = 0; clearTransient(); world?.p4Cancel?.(); aura?.p4Cancel?.(); world?.remove(); aura?.remove();
        tagged.forEach(e => e.classList.remove('p4-surface')); tagged.clear();
        document.documentElement.removeAttribute('data-p4-pet'); document.documentElement.classList.remove('p4-suspended');
        if (pet) { pet.classList.remove('p4-character'); for (const [k, v] of Object.entries(saved)) v === null ? pet.removeAttribute(k) : pet.setAttribute(k, v); }
        pet = world = aura = events = observer = flags = null; key = ''; premium = false; saved = {}; cooldown = 0; lastClick = -Infinity;
    }
    function mountPet(id) {
        clearPet(); const chosen = keyOf(id); if (!chosen) return false;
        ensureCSS(); pet = document.getElementById('virtual-pet-img'); if (!pet) return false;
        key = chosen; premium = id.endsWith('_premium'); saved = Object.fromEntries(['title','role','tabindex','aria-label'].map(k => [k,pet.getAttribute(k)]));
        pet.classList.add('p4-character'); pet.title = designs[key][1]; pet.setAttribute('aria-label', designs[key][0]+' — chạm để xem hiệu ứng'); pet.setAttribute('role','button'); pet.tabIndex = 0;
        events = new AbortController(); const opt = { signal: events.signal };
        aura = host(key, premium ? 'p4-aura p4-premium-aura' : 'p4-aura p4-regular', premium ? premiumAura(key) : `<div class="p4-pet-seal">${scene(key)}</div><div class="p4-pet-floor"></div>`, pet.parentElement);
        if (premium) {
            document.documentElement.dataset.p4Pet = key;
            world = host(key, 'p4-world p4-premium-world', premiumWorld(key));
            markInterface();
            document.addEventListener('pointerdown', e => { if (e.button === 0 && !e.target.closest?.('input,textarea,select,[contenteditable],#virtual-pet-container')) clickAt(e.clientX,e.clientY); }, { ...opt, capture:true, passive:true });
        }
        pet.addEventListener('click', ultimate, opt);
        pet.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ultimate(); } }, opt);
        // Return to studying immediately, without removing the owned/equipped pet.
        document.addEventListener('keydown', e => { if (e.key === 'Escape') clearTransient(); }, opt);
        document.addEventListener('focusin', e => { if (e.target.matches?.('input,textarea,select,[contenteditable="true"]')) clearTransient(); }, opt);
        window.addEventListener('effect-quality-change', sync, opt); document.addEventListener('visibilitychange', sync, opt); motion.addEventListener('change',sync,opt);
        observer = new MutationObserver(() => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; sync(); markInterface(); }); }); observer.observe(document.body,{childList:true,subtree:true});
        flags = new MutationObserver(sync); flags.observe(document.body,{attributes:true,attributeFilter:['class']}); flags.observe(document.documentElement,{attributes:true,attributeFilter:['class']}); flags.observe(pet.parentElement,{attributes:true,attributeFilter:['style','hidden']});
        sync(); if (events) enter(id,events.signal); return !!pet;
    }
    let effect = null, fxEvents = null, fxObserver = null;
    function clearEffect() { fxEvents?.abort(); fxObserver?.disconnect(); effect?.p4Cancel?.(); effect?.remove(); effect = fxEvents = fxObserver = null; }
    function mountEffect(k) {
        clearEffect(); if (!designs[k]) return false; ensureCSS();
        const parent = document.getElementById('global-effect-container'); if (!parent) return false;
        effect = host(k,'p4-weather',many(3,i=>`<div class="p4-weather-motif" style="--i:${i};--x:${[2,87,6][i]}%;--y:${[14,49,75][i]}%">${mark(k)}</div>`),parent);
        const update = () => { if (!effect?.isConnected) { clearEffect(); return; } effect.hidden = paused(); effect.shadowRoot.querySelector('.p4-root').classList.toggle('p4-still',quiet()); };
        fxEvents = new AbortController(); const opt = {signal:fxEvents.signal};
        window.addEventListener('effect-quality-change',update,opt); document.addEventListener('visibilitychange',update,opt); motion.addEventListener('change',update,opt);
        fxObserver = new MutationObserver(update); fxObserver.observe(document.body,{attributes:true,attributeFilter:['class']}); fxObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']}); fxObserver.observe(parent,{childList:true}); update(); return true;
    }
    function cardBackdrop(id) { const k = keyOf(id); if (!k) return ''; ensureCSS(); const s = landscape(k); return `<div class="p4-card-art p4-card-panorama" data-design="${k}" aria-hidden="true"><span>${wide(s.sky+s.far+s.near)}</span><i>${scene(k)}</i></div>`; }
    function cardPresentation(id) { const d = designs[keyOf(id)]; return d ? [d[3],d[2],d[5]] : null; }
    window.Plan4Runtime = {supports:id=>!!keyOf(id),ensureCSS,mountPet,clearPet,mountEffect,clearEffect,ultimate,clickAt,cardBackdrop,cardPresentation};
})();
