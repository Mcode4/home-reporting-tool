// -----------------------------
// Global dataset: Unit → Mailbox
// -----------------------------
const unitMailboxPairs = {
  // Page 1 (Preston Creek at McDonough Mailbox Numbers)
  "100":"1","111": "2","112": "3","113": "4","114": "5","115": "6","116": "7","117": "8","118": "9","121": "10",
  "122": "11","123": "12","124": "13","125": "14","126": "15","127": "16","128": "17","131": "18","132": "19", // corrected OCR anomaly
  "133": "20","134": "21","135": "22","136": "23","137": "24","138": "25","211": "26","212": "27","213": "28",
  "214": "29","215": "30","216": "31","217": "32","218": "33","221": "34","222": "35","223": "36", // corrected OCR anomaly
  "224": "37","225": "38","226": "39","227": "40","228": "41","231": "42","232": "43","233": "44","234": "45",
  "235": "46","236": "47","237": "48","238": "49","311": "50","312": "51","313": "52","314": "53","315": "54",
  "316": "55","317": "56","318": "57","321": "58","322": "59","323": "60","324": "61","325": "62","326": "63",
  "327": "64","328": "65","331": "66","332": "67","333": "68","334": "69","335": "70","336": "71","337": "72",
  "338": "73","411": "74","412": "75","413": "76","414": "77","415": "78","416": "79","417": "80","418": "81",
  "421": "82","422": "83","423": "84","424": "85","425": "86","426": "87","427": "88","428": "89","431": "90",
  "432": "91","433": "92","434": "93","511": "94","512": "95","513": "96","514": "97","515": "98","516": "99",
  "517": "100","518": "101","521": "102","522": "103","523": "104","524": "105","525": "106","526": "107","527": "108",
  "528": "109","531": "110","532": "111","533": "112","534": "113","535": "114","536": "115","537": "116","538": "117",
  "611": "118","612": "119","613": "120","614": "121","615": "122","616": "123",


  // Page 2 (Units 617–1123 with mailboxes 124–284)
  "617": "124","618": "125","621": "126","622": "127","623": "128","624": "129","625": "130","626": "131","627": "132","628": "133",
  "631": "134","632": "135","633": "136","634": "137","635": "138","636": "139","637": "140","638": "141",
  "711": "142","712": "143","713": "144","714": "145","715": "146","716": "147","717": "148","718": "149",
  "721": "150","722": "151","723": "152","724": "153","725": "154","726": "155","727": "156","728": "157",
  "731": "158","732": "159","733": "160","734": "161","735": "162", // corrected OCR anomaly
  "736": "163","737": "164","738": "165",
  "811": "166","812": "167","813": "168","814": "169","815": "170","816": "171","817": "172","818": "173",
  "821": "174","822": "175","823": "176","824": "177","825": "178","826": "179","827": "180","828": "181",
  "831": "182","832": "183","833": "184","834": "185","835": "186","836": "187","837": "188","838": "189",
  "911": "190","912": "191","913": "192","914": "193","915": "194","916": "195","917": "196","918": "197",
  "921": "198","922": "199","923": "200","924": "201","925": "202","926": "203","927": "204","928": "205",
  "931": "206","932": "207","933": "208","934": "209","935": "210","936": "211","937": "212","938": "213",
  "1011": "214","1012": "215","1013": "216","1014": "217","1015": "218","1016": "219","1017": "220","1018": "221",
  "1021": "222","1022": "223","1023": "224","1024": "225","1025": "226","1026": "227","1027": "228","1028": "229",
  "1031": "230","1032": "231","1033": "232","1034": "233","1035": "234","1036": "235","1037": "236","1038": "237",
  "1111": "238","1112": "239","1113": "240","1114": "241","1115": "242","1116": "243","1117": "244","1118": "245",
  "1121": "246","1122": "247","1123": "248",


  // Page 3 (Units 1124–1902 with mailboxes 249–268)
  "1124": "249","1125": "250","1126": "251","1127": "252","1128": "253",
  "1131": "254","1132": "255","1133": "256","1134": "257","1135": "258","1136": "259","1137": "260",
  "1138": "261",
  "1201": "262","1202": "263",
  "1311": "264","1312": "265","1313": "266","1314": "267",
  "1321": "268","1322": "269","1323": "270","1324": "271",
  "1331": "272","1332": "273","1333": "274","1334": "275",
  "1411": "276","1412": "277","1413": "278","1414": "279",
  "1421": "280","1422": "281","1423": "282","1424": "283",
  "1431": "284","1432": "285","1433": "286","1434": "287",
  "1501": "288","1502": "289",
  "1611": "290","1612": "291","1613": "292","1614": "293",
  "1615": "294", // anomaly: jumps ahead
  "1616": "295","1617": "296","1618": "297",
  "1621": "298","1622": "299","1623": "300","1624": "301",
  "1625": "302", // anomaly: jumps ahead
  "1626": "303","1627": "304","1628": "305",
  "1632": "306","1634": "307","1635": "308",
  "1637": "309","1711": "310","1712": "311",
  "1713": "312","1714": "313","1721": "314","1722": "315",
  "1723": "316","1724": "317","1731": "318","1732": "319",
  "1733": "320","1734": "321","1811": "322","1812": "323",
  "1813": "324","1814": "325","1821": "326","1822": "327",
  "1823": "328", // anomaly: jumps back
  "1824": "329","1831": "330","1832": "331","1833": "332","1834": "333",
  "1901": "334",
  "1902": "335", // anomaly: missing 267
};


// -----------------------------
// Build dropdowns for all forms
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Auto-fill timestamps
  const now = new Date().toLocaleString();
  document.querySelectorAll("[id^='timestamp']").forEach(el => el.value = now);

  // Populate Unit/Mailbox dropdowns
  for (let i = 1; i <= 7; i++) {
    const selector = document.getElementById("unitSelector" + i);
    if (!selector) continue;
    selector.innerHTML = '<option value="">-- Choose --</option>';
    for (const [unit, mailbox] of Object.entries(unitMailboxPairs)) {
      const option = document.createElement("option");
      option.value = `${unit}|${mailbox}`;
      option.textContent = `Unit ${unit} → Mailbox ${mailbox}`;
      selector.appendChild(option);
    }
  }
});

// -----------------------------
// Auto-fill Unit/Mailbox fields
// -----------------------------
function fillUnitAndMailbox(formId) {
  const selected = document.getElementById("unitSelector" + formId).value;
  if (!selected) {
    document.getElementById("unitOutput" + formId).value = "";
    document.getElementById("mailboxOutput" + formId).value = "";
    return;
  }
  const [unit, mailbox] = selected.split("|");
  document.getElementById("unitOutput" + formId).value = unit;
  document.getElementById("mailboxOutput" + formId).value = mailbox;
}

// -----------------------------
// Submit function (generic)
// -----------------------------
function submitForm(formId) {
  const timestamp = document.getElementById("timestamp" + formId).value;
  const tech = document.getElementById("tech" + formId).value;
  const building = document.getElementById("building" + formId)?.value || "";
  const amenity = document.getElementById("amenity" + formId)?.value || "";
  const garage = document.getElementById("garage" + formId)?.value || "";
  const maintenanceType = document.getElementById("maintenanceType" + formId)?.value || "";
  const summary = document.getElementById("summary" + formId).value;

  // NEW: unit + mailbox
  const unit = document.getElementById("unitOutput" + formId)?.value || "";
  const mailbox = document.getElementById("mailboxOutput" + formId)?.value || "";

// Collect new key turnover fields const keyStatus = document.getElementById(`keyStatus${formId}`).value; const lockId = document.getElementById(`lockId${formId}`).value; const turnoverDate = document.getElementById(`turnoverDate${formId}`).value;



  const report = 
`--- ${formId} Maintenance Log ---
Date & Time: ${timestamp}
Technician: ${tech}
Building: ${building}
Amenity: ${amenity}
Garage: ${garage}
Unit: ${unit}
Mailbox: ${mailbox}
Maintenance Type: ${maintenanceType}
Summary: ${summary}
Key Status: ${keyStatus} | Lock ID: ${lockId} | Turnover Date: ${turnoverDate}
-----------------------------`;

  navigator.clipboard.writeText(report).then(() => {
    alert(`${formId} log copied to clipboard!\n\n${report}`);
  }).catch(err => {
    console.error("Clipboard copy failed:", err);
  });
}

// -----------------------------
// Sidebar toggle + form toggle
// -----------------------------
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}

function toggleForm(id) {
  const form = document.getElementById(id);
  form.style.display = form.style.display === 'block' ? 'none' : 'block';
  if (form.style.display === 'block') {
    const ts = form.querySelector("input[id^='timestamp']");
    if (ts) ts.value = new Date().toLocaleString();
  }
}

// -----------------------------
// Dragging + zoom logic
// -----------------------------
function enableDrag(el) {
  let offsetX, offsetY;
  el.addEventListener("mousedown", function(e) {
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    function move(ev) {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
    }
    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });
  el.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    offsetX = t.clientX - el.getBoundingClientRect().left;
    offsetY = t.clientY - el.getBoundingClientRect().top;
    function moveTouch(ev) {
      const tt = ev.touches[0];
      el.style.left = tt.clientX - offsetX + "px";
      el.style.top = tt.clientY - offsetY + "px";
    }
    function stopTouch() {
      document.removeEventListener("touchmove", moveTouch);
      document.removeEventListener("touchend", stopTouch);
    }
    document.addEventListener("touchmove", moveTouch);
    document.addEventListener("touchend", stopTouch);
  });
}

window.onload = () => {
  document.querySelectorAll('.building, .amenity, .garage').forEach(enableDrag);
};

let scale = 1;
const map = document.getElementById("map");
document.getElementById("mapContainer").addEventListener("wheel", function(e) {
  e.preventDefault();
  scale *= e.deltaY < 0 ? 1.1 : 0.9;
  scale = Math.min(Math.max(scale, 0.5), 3);
  map.style.transform = `scale(${scale})`;
});