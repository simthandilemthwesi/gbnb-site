import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    simBotDb: any;
    loadSimBot: () => void;
  }
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦' },
  { code: 'xh', name: 'Xhosa', flag: '🇿🇦' },
  { code: 'st', name: 'Sotho', flag: '🇿🇦' },
  { code: 'tn', name: 'Tswana', flag: '🇿🇦' },
  { code: 'ns', name: 'Northern Sotho', flag: '🇿🇦' },
  { code: 'ss', name: 'Swati', flag: '🇿🇦' },
  { code: 've', name: 'Venda', flag: '🇿🇦' },
  { code: 'nr', name: 'Ndebele', flag: '🇿🇦' },
  { code: 'ts', name: 'Tsonga', flag: '🇿🇦' },
];

const welcomeMessages: Record<string, string> = {
  en: "Hello! I'm SIM-BOT, your virtual assistant for George Bakhanyiselwa Nguwe Bawo NPC. How can I help you today?",
  af: "Hallo! Ek is SIM-BOT, jou virtuelle assistent vir George Bakhanyiselwa Nguwe Bawo NPC. Hoe kan ek jou help?",
  zu: "Sawubona! Ngingu SIM-BOT, umsizi wakho wesiteshi se George Bakhanyiselwa Nguwe Bawo NPC. Ngingakusiza?",
  xh: "Molo! Ndingu SIM-BOT, umncedisi wakho we George Bakhanyiselwa Nguwe Bawo NPC. Ndingakunceda?",
  st: "Dumela! Ke SIM-BOT, motlhankedi wa hao wa George Bakhanyiselwa Nguwe Bawo NPC. O ka nthusa joang?",
  tn: "Dumela! Ke SIM-BOT, motswanakarabo wa gago wa George Bakhanyiselwa Nguwe Bawo NPC. O ka nthusa jwang?",
  ns: "Dumela! Ke SIM-BOT, motswanakarabo wa gago wa George Bakhanyiselwa Nguwe Bawo NPC. O ka nthusa eng?",
  ss: "Sawubona! Ngingu SIM-BOT, umsitafini wakho we George Bakhanyiselwa Nguwe Bawo NPC. Ngingakusita?",
  ve: "Nda! Ndi ndi SIM-BOT, mufhangi wa hafho wa George Bakhanyiselwa Nguwe Bawo NPC. Ndi nga thusa?",
  nr: "Sawubona! Ngingu SIM-BOT, umsizi wakho we George Bakhanyiselwa Nguwe Bawo NPC. Ngingakusiza?",
  ts: "Mhoro! Hi ndi SIM-BOT, muxwaleko wa wena wa George Bakhanyiselwa Nguwe Bawo NPC. Mi nga ku pfuna?",
};

const responses: Record<string, Record<string, string>> = {
  en: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC offers several programs:\n\n• Faith & Worship Unity - Prayer, worship, and collective faith activities\n• Community Development - Education, support, and sustainable initiatives\n• Youth Empowerment - Mentorship and shared experiences\n• Digital Ministry - Online fellowship and digital community building\n\nWould you like more details about any of these?",
    volunteer: "We'd love to have you volunteer with us! Visit our Get Involved page or contact us at info.gbnb@gmail.com. You can also call +27 785 78 6134. We welcome everyone who shares our vision!",
    donate: "Thank you for considering a donation! Visit our Get Involved page to learn about ways to support our mission. Every contribution helps us serve our community better.",
    location: "We're located in Thembalethu, George, South Africa. You can also visit us at bakhanyiselwa.web.app or contact us for directions.",
    contact: "You can reach us at:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nWe're here to help!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) is a faith-based nonprofit organization. Our motto is 'Yizani Sakhe Udonga Lwe Jerusalem' (Come and Build the Wall of Jerusalem). We build faith-centered communities through fellowship, worship, and service.",
    hello: "Hello! Welcome to George Bakhanyiselwa Nguwe Bawo NPC! I'm SIM-BOT, here to assist you. What would you like to know about our organization?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    bye: "Goodbye! May God bless you! Feel free to return anytime if you have more questions.",
    default: "Thank you for your message! For specific inquiries, please contact us at info.gbnb@gmail.com or call +27 785 78 6134. You can also visit our Contact page for more options."
  },
  af: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC bied verskeie programme aan:\n\n• Geloof & Aanbidding Eenheid - Gebed, aanbidding en kollektiewe geloofsaktiwiteite\n• Gemeenskapsontwikkeling - Ondersteuning en volhoubare inisiatiewe\n• Jeugbemagtiging - Mentorskap en gedeelde ervarings\n• Digitale Bediening - Aanlyn fellowship en digitale gemeenskapsbou\n\nWil jy meer besonderhede hieroor hê?",
    volunteer: "Ons sal graag hê dat jy saam met ons! Besoek我们的Betrokke Blad of kontak ons by info.gbnb@gmail.com. Jy kan ook +27 785 78 6134 bel. Ons verwelkom almal wat ons visie deel!",
    donate: "Dankie dat jy 'n donasie oorweeg! Besoek我们的Betrokke Blad om te leer oor maniere om ons missie te ondersteun. Elke bydrae help ons om ons gemeenskap beter te bedien.",
    location: "Ons is geleë in Thembalethu, George, Suid-Afrika. Jy kan ons ook by bakhanyiselwa.web.app besoek of kontak ons vir aanwysings.",
    contact: "Jy kan ons bereik by:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nOns is hier om te help!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) is 'n geloof-gebaseerde nie-winsgewende organisasie. Onse leuse is 'Yizani Sakhe Udonga Lwe Jerusalem' (Kom en Bou die Muur van Jerusalem). Ons bou geloof-sentrum gemeenskappe deur fellowship, aanbidding en diens.",
    hello: "Hallo! Welkom by George Bakhanyiselwa Nguwe Bawo NPC! Ek is SIM-BOT, hier om jou te help. Wat wil jy graag oor ons organisasie weet?",
    thanks: "Graag! Is daar nog iets wat ek kan help?",
    bye: "Totsiens! Mag God jou seën! Voel vry om enige tyd terug te kom as jy meer vrae het.",
    default: "Dankie vir jou boodskap! Vir spesifieke navrae, kontak ons asseblief by info.gbnb@gmail.com of bel +27 785 78 6134. Jy kan ook our Contact Blad besoek vir meer opsies."
  },
  zu: {
    programs: "I-George Bakhanyiselwa Nguwe Bawo NPC inikeza izinhlelo eziningi:\n\n• Inkolo & Ukuhlonipha Ubuntu - Ukuphumula, ukuhlonipha, nemisebenzi yenkolo\n• Ukuthuthukiswa Koluntu - Imfundo, insiza, nezinqumo ezihlalayo\n• Ukunqumama Amasoka - Ukufunda ngemfundo nemisebenzi eyabelwana ngayo\n• Umsebenzi Wamajwele - Ukuhlalisana kwe-internet nokwakhiwa kwe community yedijithali\n\nUngathanda ulwazi oluningi ngalokhu?",
    volunteer: "Siyakuthanda ukube uyasebenzisana nathi! Vakashela Ikhasi Lethu Lokuzibandakanya noma usithintele ku info.gbnb@gmail.com. Ungakwazi futhi ukusiza +27 785 78 6134. Siwamukela bonke ababelana nesibonelo sethu!",
    donate: "Siyabonga ngokucabanga ngenkomo! Vakashela Ikhasi Lethu Lokuzibandakanya ukuze ufunde ngamakhodi wokusekela umsebenzi wethu. Konke konke kuyasisiza sikhonze umphakathi.",
    location: "Sise-Thembalethu, eGeorge, eNingizimu Afrika. Ungavakashela futhi ku bakhanyiselwa.web.app noma usithintele ukuze ufunde indlela.",
    contact: "Ungathinta kuthi:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nSikule to assist!",
    about: "I-George Bakhanyiselwa Nguwe Bawo NPC (GBNB) iyinhlangano engenzi nzuzo esekelwe inkolo. umkhuba wethu yi 'Yizani Sakhe Udonga Lwe Jerusalem' (M come futhi Uphule Ikhaya Likazululand). Sakha imiphakathi ephakeme ngenkolo ngokuhlalisana, ukuhlonipha, nokusebenzela.",
    hello: "Sawubona! Welcome ku George Bakhanyiselwa Nguwe Bawo NPC! Ngingu SIM-BOT, la ukusiza. Yini ongathanda ukuyazi nge organization yethu?",
    thanks: "Ngiyabonga! Kunenkinga enye engingakusiza?",
    bye: "Sala kahle! uMveli angakubusisi! Uzoma phindela noma unemibuzo engako.",
    default: "Siyabonga umlayezo wakho! For imibuzo ethile, sicinga ukuthi uxhumane nathi ku info.gbnb@gmail.com noma usize +27 785 78 6134. Ungavakashela Ikhasi Lethu Le-Contact."
  },
  xh: {
    programs: "I-George Bakhanyiselwa Nguwe Bawo NPC inikeza iinkqubo ezininzi:\n\n• Inkolo & Ukuhlonipha Ubuntu - Im祈祷, ukuhlonipha, nemisebenzi yenkolo\n• Uphuhliso Lwabemi - Imfundo, inkxaso, namaphulo asenzelayo\n• Amandla Esosha - Ukufunda ngemfundo nemisebenzi eyabelwana ngayo\n• Inkonzo Yedijithali - Ukuhlalisana kwinethwayeki nokwakhiwa kwe community\n\nUngathanda ulwazi oluningi?",
    volunteer: "Siyakuthanda ukuba usebenze nathi! Tyelela iphepha lethu lokuzibandakanya okanye uqhagamshelane nathi ku info.gbnb@gmail.com. Unako ukusiza +27 785 78 6134. Siwamukela bonke ababelana nombono wethu!",
    donate: "Enkosi ngokuqwalasela inkxaso! Tyelela iphepha lethu lokuzibandakanya ukuze ufunde ngeendlela zokuxhasa umsebenzi wethu. Yonke inkxaso isinceda sikhonze uluntu.",
    location: "Sikwi-Thembalethu, eGeorge, eMzantsi Afrika. Unokutyelela kwakhona ku bakhanyiselwa.web.app okanye uqhagamshelane nathi ukuze ufunde indlela.",
    contact: "Ungadibana nathi:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nSikule ukusiza!",
    about: "I-George Bakhanyiselwa Nguwe Bawo NPC (GBNB) ngumbutho ongenzi nzuzo ogxile kwinkolo. islogan yethu yi 'Yizani Sakhe Udonga Lwe Jerusalem' (M come uze Uphule Indlu kaZulu). Sakha uluntu olugxile kwinkolo ngokuhlalisana, ukuhlonipha, nokusebenzela.",
    hello: "Molo! Wamkelekile ku George Bakhanyiselwa Nguwe Bawo NPC! Ndingu SIM-BOT, apha ukukunceda. Yintoni ongathanda ukuyazi ngumbutho wethu?",
    thanks: "Enkosi! Ikho enye into endingakunceda?",
    bye: "Sala kakuhle! uMveli angakusikelela! Uzoma xa unemibuzo.",
    default: "Enkosi umyalezo wakho! Imibuzo ethile, ncuma uqhagamshelane nathi ku info.gbnb@gmail.com okanye usize +27 785 78 6134. Ungayotyelela iphepha lethu le-Contact."
  },
  st: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC e fana dihwahwa tse ngata:\n\n• Tumelo & Thapelo - Dithapelo, bolela le mesebetsi ya tumelo\n• Ntshetsopele ya setereke - Thuto, thuso le merero ya morao ra tshwanelo\n• Powered ya bana - Mechini le mesebetsi ya abelwana\n• Ministry ya dijithale - Fellowship ya inthanete le ya setereke dijithale\n\nO ka rata haholo?",
    volunteer: "Re lakatsa hore o sebetse le rona! Etela leqephe la rona kapa re ikopanye ho info.gbnb@gmail.com. O ka boela o letsetsa +27 785 78 6134. Re amohela bohle ba abelana le ponelopele ea rona!",
    donate: "Re leboha ha o nahana ka mohono! Etela leqephe la rona la ho ikopanya ho ithuta ka litsela tsa ho tshehetsa morero oa rona. Katleho e 'ngoe e re thusa ho nthela setereke.",
    location: "Re shebane le Thembalethu, George, Afrika Borwa. O ka boela o etele bakhanyiselwa.web.app kapa re ikopanye ho fumana dirona.",
    contact: "O ka ikopanya re:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nRe le ho thusa!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) ke mokhatlo o sa etseng phaello o thehiloe tumelong. slogan ea rona ke 'Yizani Sakhe Udonga Lwe Jerusalem' (Tla ohe Mose O Rara). Re aha di community tse thehiloe tumelong ka ho qoba, ho rapela, le ho sebetsa.",
    hello: "Dumela! Re amohela ka letsoho ho George Bakhanyiselwa Nguwe Bawo NPC! Ke SIM-BOT, mona ho u thusa. Ke eng eo u ka ratang ho e tseba ka mokhatlo oa rona?",
    thanks: "Le bohma! Ho na le tse ling tseo nka u thusang?",
    bye: "Sala hantle! Morimo o u bolele! Khutla nako e 'ngoe ha u na le lipotso.",
    default: "Le bohmong molaetsa oa hao! Lipotso tse itseng, kopo ikopanye le rona ho info.gbnb@gmail.com kapa letsetsa +27 785 78 6134. O ka etela leqephe la rona la Contact."
  },
  tn: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC e na le porogarame e e negatsang:\n\n• Tumelo le Tshepo - Dithapelo, tshepo, le tiro ya tumelo\n• Tlhabololo ya baagi - Thuto, thuso, le ditlhopha tsa nako e telele\n• Ntshetsopele ya bana - Kgothaletso le ditiro tse abelanwang\n• Taolo ya dijita - Tšhimologo ya inthanete le baagi ya dijita\n\nO ka ratang le goeletsa?",
    volunteer: "Re opela gore o dire le rona! Etela letlakala la gago kapa re buisaneng ka info.gbnb@gmail.com. O ka boela o letsetsa +27 785 78 6134. Re amogela batho bothe ba abelanang le pono ya rona!",
    donate: "Re a leboga ka go akanya ka pono! Etela letlakala la gago la go ikopanya go ithuta ka magolo a go tshegetsa morero wa rona. Katlego e le nngwe e re thusa go direla baagi.",
    location: "Re kwa Thembalethu, George, Aforika Borwa. O ka boela o etele bakhanyiselwa.web.app kana re buisaneng go fitlha tsela.",
    contact: "O ka re buisanela:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nRe le gale go thusa!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) ke mokgatlo wo o sa direng tshwanelo o theilweng tumelong. leina la rona ke 'Yizani Sakhe Udonga Lwe Jerusalem' (Tla o phulanye Motho wa Jerusalem). Re aha mad community a theilweng tumelong ka go latlhegelwa, go rapela, le go direla.",
    hello: "Dumela! O amogetswe go George Bakhanyiselwa Nguwe Bawo NPC! Ke SIM-BOT, fa go go thusa. Goreng o ka ratang go itse ka mokgatlo wa rona?",
    thanks: "A leboga! Go na le eng e nngwe e nka go thusang?",
    bye: "Sala sentle! Modimo o go bolelele! Boela gape fa o na le dipotso.",
    default: "Mma ya gago ya leboga! Dipotso tse di tshwanang, kopo re buisaneng ka info.gbnb@gmail.com kana o letsetsa +27 785 78 6134. O ka etela letlakala la rona la Contact."
  },
  ns: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC e na le diprograma tše manyane:\n\n• Tumelo le Tshedimošo - Dithapelo, tshedimošo, le ditiro tša tumelo\n• Tlhabololo ya selete - Thuto, thuso, le dikgato tša mmuso\n• Ntshetsopele ya bana - Kgothaletšo le ditiro tšeo di abelanwago\n• Taolo ya dijita - Tšhimologo ya internet le selete ya dijita\n\nO ka ratang go hwetša?",
    volunteer: "Re a lwantšha gore o šome le rona! Etela letlakala la gago goba re ikopanye ka info.gbnb@gmail.com. O ka boa o bitša +27 785 78 6134. Re amogela batho bošo bao ba abelanago le pono ya rona!",
    donate: "Re a leboga ka go nagana ka pono! Etela letlakala la gago la go ikopanya go ithuta ka mehla ya go tshegetša morero wa rona. Katlego e tee e re thusa go šoma selete.",
    location: "Re le gona ka Thembalethu, George, Afrika Borwa. O ka boa o etela bakhanyiselwa.web.app goba re ikopanye go hwetša dithulatlhogo.",
    contact: "O ka re ikopanya:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nRe le gona go thusa!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) ke mmuseletšana wo o sa dirago phihlelelo o theilwego tumelong. motto wa rona ke 'Yizani Sakhe Udonga Lwe Jerusalem' (Tla o phumulanye Motho wa Jerusalem). Re aha di-selete tšeo di theilwego tumelong ka go latlhegelwa, go rapela, le go šoma.",
    hello: "Dumela! O amogetswe go George Bakhanyiselwa Nguwe Bawo NPC! Ke SIM-BOT, fa go le gona go thusa. Ke eng seo o ka ratanggo se tsebe ka mmuseletšana wa rona?",
    thanks: "A leboga! Go na le eng e nngwe yeo nka eo e tshephusago?",
    bye: "Sala gabotse! Modimo o go bolele! Boa gape fa o na le dipotšišo.",
    default: "Mma ya gago ya leboga! Dipotšišo tše di kgethegilego, kopo re ikopanye ka info.gbnb@gmail.com goba o bitše +27 785 78 6134. O ka etela letlakala la rona la Contact."
  },
  ss: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC inikeza tinsayenda letinhlanu:\n\n• Tinyanga Netiveko - Tinyiko, kuvakasha, netiveko yemave kanye nemisebenti yemave\n• Kutfutfukiswa Kwenhlangano - Tfutfukiso, lisito, netiveko lenhlangano\n• Kuvusa Emadvodzana - Kuhlanganiswa kwemave kanye nemisebenti lebahliwe\n• Umsebenti Wetinkhulumeto - Kuhlalisana kwebandla etekuphela kanye netinkhulumeto tenkhulumeto\n\nUngathanda lucingo?",
    volunteer: "Siyabonga sicela usebente nabo! Vakashela luhlobo lwenu noma usitsintse ku info.gbnb@gmail.com. Ungasitsintsa naku +27 785 78 6134. Samukela bonke labatsintaka lesithombe sethu!",
    donate: "Siyabonga ngaphandle kwensipho yakho! Vakashela luhlobo lwenu lwekutsintana ukuze ufunde ngeluhlobo lwentshengiselo yemisebenti yethu. Konke lokusiza kusita ekungeneni indzawo yetfu.",
    location: "Sise emsakazini wa Thembalethu, eGeorge, eNingizimu Afrika. Ungabuyisela ku bakhanyiselwa.web.app noma usitsintse ukuze ufunde indlela.",
    contact: "Ungatsintsa:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nSikulungele kusita!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) lenkhulumetfu leqophelo lensiza. umcondvo wethu nguleti 'Yizani Sakhe Udonga Lwe Jerusalem' (Yini futsi Uphule Umculo wa Jerusalem). Sakha tinhlangano letigele emanyikweni ngemphakatsi, kuvakasha, netisebenti.",
    hello: "Sawubona! Uswamile e George Bakhanyiselwa Nguwe Bawo NPC! Ngingu SIM-BOT, la ku sizedza. Yini longathanda kuyibona ngesikhatsi senkhuluma?",
    thanks: "Ngiyabonga! Kukhona lenye into lengakusiza?",
    bite: "Sala kahle! uMveli angakubongela! Buyela noma unemibuzo.",
    default: "Siyabonga umyalezo wakho! Imibuzo lebalulekile, sicela usitsintse ku info.gbnb@gmail.com noma ubonge +27 785 78 6134. Ungavakashela luhlobo lwethu lwe-Contact."
  },
  ve: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC i na zwiko zwinzhi:\n\n• Nyimiso & U vhonela - Ma祈, u vhonela, na zwiko zwa nyimiso\n• Mveledziso wa dorobo - Madzialana, thuso, na zwiko zwa tshilavhu\n• N Powered ya vhaswa - Khwiniso na zwiko zwo livhalaho\n• Vhulamukwa wa dzikhithara - Ma relationship a inthanete na dorobo ya dzikhithara\n\ni hamba hafhi?",
    volunteer: "Ri na luga u shuma na vho! Khou itela fola ya vho kana ri khou itela vhuch contacto.info.gbnb@gmail.com. Ni nga li thusa na +27 785 78 6134. Ri a amba vhaswa vhothe vha tshimbilelanaho na vhulamukwa havhala!",
    donate: "Ri a livhuwa nga u dipensa nga lwendo! Khou itela fola ya vho ya u dzhenelela u itela u vhala nga nzhia dzo theleshaho vhusime vha roni. Nnda-thothi ndi ṱhogomu ya vha thusa u shuma.",
    location: "Ri hone e Thembalethu, George, Afurika Tshipembe. Ni nga itela bakhanyiselwa.web.app kana ri khou itela vhucontact u wana ngwalavho.",
    contact: "Ni nga ri contact:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nRi hone u thusa!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) ndi vhuḓi ha mulayo othea ha fheli zwauri othea nga nyimiso. motto ya roni ndi 'Yizani Sakhe Udonga Lwe Jerusalem' (Va na u fhumula Luvandele). Ri a fhumula magaṇa othea a vhonelwaho nga nyimiso, u vhonela, na u shuma.",
    hello: "Nda! Ri amukela e George Bakhanyiselwa Nguwe Bawo NPC! Ndi ndi SIM-BOT, hone u thusa. Ndi hani iino ri ṱhogomu u itela u vhala nga vhalamukwa ha roni?",
    thanks: "A livhuwa! Ho na hani hone ri nga thusa?",
    bye: "Sala nhunde! Mudzimu a u vhalele! U bvela mushonga ni tshi nwala.",
    default: "Livhuwa ya mulaၠ wa gago! Miṅwe miṅwe ya mulayo, ṋ ṋ contact.info.gbnb@gmail.com kana u bvela +27 785 78 6134. Ni nga itela fola ya roni ya Contact."
  },
  nr: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC inikeza izinhlelo ezinengi:\n\n• Inkolo nokuhlonipha - Ukuphumula, ukuhlonipha, nemisebenzi yenkolo\n• Ukuthuthukiswa komphakathi - Imfundo, insiza, nezinqumo ezihlalayo\n• Amandla abafana - Ukufunda ngemfundo nemisebenzi eyabelwana ngayo\n• Umsebenzi wamajelo - Ukuhlalisana kwinethwayeki nokwakhiwa komphakathi\n\nUngathanda ulwazi oluningi?",
    volunteer: "Siyakuthanda ukube uyasebenzisana nathi! Vakashela iphepha lethu lokuzibandakanya noma usithintele ku info.gbnb@gmail.com. Ungakwazi futhi ukusiza +27 785 78 6134. Siwamukela bonke ababelana nesibonelo sethu!",
    donate: "Siyabonga ngokucabanga ngenkomo! Vakashela iphepha lethu lokuzibandakanya ukuze ufunde ngamakhodi wokusekela umsebenzi wethu. Konke konke kuyasisiza sikhonze umphakathi.",
    location: "Sise-Thembalethu, eGeorge, eNingizimu Afrika. Ungavakashela futhi ku bakhanyiselwa.web.app noma usithintele ukuze ufunde indlela.",
    contact: "Ungathinta kuthi:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nSikule ukusiza!",
    about: "I-George Bakhanyiselwa Nguwe Bawo NPC (GBNB) iyinhlangano engenzi nzuzo esekelwe inkolo. islogan yethu yi 'Yizani Sakhe Udonga Lwe Jerusalem' (M come futhi Uphule Ikhaya Likazululand). Sakha imiphakathi ephakeme ngenkolo ngokuhlalisana, ukuhlonipha, nokusebenzela.",
    hello: "Sawubona! Wamkelekile ku George Bakhanyiselwa Nguwe Bawo NPC! Ngingu SIM-BOT, la ukusiza. Yini ongathanda ukuyazi nge organization yethu?",
    thanks: "Ngiyabonga! Kunenkinga enye engingakusiza?",
    bye: "Sala kahle! uMveli angakubusisi! Uzoma phindela noma unemibuzo.",
    default: "Siyabonga umlayezo wakho! For imibuzo ethile, sicinga ukuthi uxhumane nathi ku info.gbnb@gmail.com noma usize +27 785 78 6134. Ungavakashela iphepha lethu le-Contact."
  },
  ts: {
    programs: "George Bakhanyiselwa Nguwe Bawo NPC i na manyikayetele ya matimba:\n\n• Switirho & Vuhluri - Swi祈, vuhluri, na mayelana ya switirho\n• Nhluvukiso wa doroba - Dyondzo, ntshuxeko, na mayelana ya nkarhi wa le henhla\n• Xiyenge xa vatshwa - Xikelete na mayelana ya hoxa\n• Mupfanandzeri wa dziJitala - swikambano swa inthanete na doroba ya dziJitala\n\ni endla a?",
    volunteer: "Hiyangana u tirha na vhudi! Sovexa xikongolo xa vhudi kana hiyangana na info.gbnb@gmail.com. Ungana ku pfuna na +27 785 78 6134. Hi amukela vhotone avo a hetana na swivono swa vhudi!",
    donate: "A hi lexe ndlela ya nkumo! Sovexa xikongolo xa vhudi xa ku hetana ku lava ha yona ku pfuna ntirho wa vhudi. Nkambisano wun'we wu hi pfuna ku tirha doroba.",
    location: "Hi laha Thembalethu, George, Afrika Dzonga. Ungana ku sivexa bakhanyiselwa.kutula kana hiyangana ku lava tshelede.",
    contact: "Ungana ku hi ringana:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app\n\nHi kule ku pfuna!",
    about: "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) i xikongolo xa nkumo e sungulaka hi vuhluri. xivono xa vhudi i 'Yizani Sakhe Udonga Lwe Jerusalem' (M come u pfulula mulomo wa Jerusalem). Hi aka doroba ya hlaya e sungulaka hi vuhluri hi ku hlanganana, ku vuhluri, na ku tirha.",
    hello: "Mhoro! W欢迎到 George Bakhanyiselwa Nguwe Bawo NPC! Ndi ndi SIM-BOT, la ku pfuna. Xana xi endle lexi u lava ku sweka xikan'we na xikongolo xa vhudi?",
    thanks: "A hi lexe! Kuna xin'we xinge xi nga ku pfuna?",
    bye: "Sala kahle! Xikriste xi ku rhandza! Uela xihoxa xa u na swivutiso.",
    default: "A hi lexe mpayaxa wa wena! Swivutiso swin'we, svinga ku ringana na info.gbnb@gmail.com kana u vitana +27 785 78 6134. Ungana ku sovexela xikongolo xa vhudi xa Contact."
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessages['en'],
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getResponse = (key: string): string => {
    return responses[selectedLang]?.[key] || responses['en'][key] || responses.en.default;
  };

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setMessages([{
      id: Date.now(),
      text: welcomeMessages[langCode] || welcomeMessages.en,
      isUser: false,
      timestamp: new Date()
    }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickReplies = [
    { label: "Programs", question: "What programs does George Bakhanyiselwa Nguwe Bawo NPC offer?" },
    { label: "Volunteer", question: "How can I volunteer?" },
    { label: "Donate", question: "How can I donate?" },
    { label: "Location", question: "Where are you located?" },
    { label: "Contact", question: "How can I contact you?" },
    { label: "About", question: "Tell me about George Bakhanyiselwa Nguwe Bawo NPC" }
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('program') || lowerMessage.includes('service') || lowerMessage.includes('offer')) {
      return getResponse('programs');
    }
    
    if (lowerMessage.includes('volunteer') || lowerMessage.includes('join') || lowerMessage.includes('help')) {
      return getResponse('volunteer');
    }
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('donation') || lowerMessage.includes('give')) {
      return getResponse('donate');
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
      return getResponse('location');
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      return getResponse('contact');
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('what is gbnb')) {
      return getResponse('about');
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return getResponse('hello');
    }
    
    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return getResponse('thanks');
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
      return getResponse('bye');
    }
    
    return getResponse('default');
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-700 rotate-90' : 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
        }`}
        aria-label="Chat with SIM-BOT"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window - Responsive */}
      <div
        className={`fixed bottom-20 right-4 md:right-6 z-50 w-[95vw] md:w-96 max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 md:p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">SIM-BOT</h3>
                <p className="text-xs text-blue-100">AI Assistant</p>
              </div>
            </div>
            {/* Language Dropdown */}
            <select 
              value={selectedLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-white text-blue-800 rounded-lg px-2 py-1.5 border-none outline-none cursor-pointer font-medium"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages - Responsive height */}
        <div className="h-[40vh] md:h-80 overflow-y-auto p-3 md:p-4 bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                  SB
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="mb-3 flex justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2">
                SB
              </div>
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-3 bg-white border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.slice(0, 4).map((reply, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(reply.question)}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
