
import React, { useMemo, useState } from "react";

const sections = [
  {
    title: "PMO, President & National Leadership",
    icon: "🏛️",
    items: [
      ["Prime Minister of India", "Prime Minister's Office", "https://www.pmindia.gov.in/"],
      ["PMO Contact & Grievance", "Official PMO contact and public grievance information", "https://www.pmindia.gov.in/en/interact-with-honble-pm/"],
      ["President of India", "President's Secretariat", "https://presidentofindia.nic.in/"],
      ["Vice President of India", "Vice President Secretariat", "https://vicepresidentofindia.nic.in/"],
      ["Cabinet Secretariat", "Cabinet decisions and government business", "https://cabsec.gov.in/"],
      ["MyGov India", "Citizen participation and campaigns", "https://www.mygov.in/"],
      ["India.gov.in", "National government information directory", "https://www.india.gov.in/"],
      ["National Government Services Portal", "Central and state online services", "https://services.india.gov.in/"]
    ]
  },
  {
    title: "Central Government & Ministries",
    icon: "🇮🇳",
    items: [
      ["Ministry of Home Affairs", "Internal security and administration", "https://www.mha.gov.in/"],
      ["Ministry of Finance", "Finance and economic affairs", "https://www.finmin.gov.in/"],
      ["Ministry of External Affairs", "Passport and foreign affairs", "https://www.mea.gov.in/"],
      ["Ministry of Law & Justice", "Law and legislative matters", "https://lawmin.gov.in/"],
      ["Ministry of Health", "National health programmes", "https://mohfw.gov.in/"],
      ["Ministry of Education", "School and higher education", "https://www.education.gov.in/"],
      ["Ministry of Women & Child Development", "Women and child welfare", "https://wcd.gov.in/"],
      ["Ministry of Social Justice", "Social justice and empowerment", "https://socialjustice.gov.in/"],
      ["Ministry of Tribal Affairs", "Tribal welfare", "https://tribal.nic.in/"],
      ["Ministry of Rural Development", "Rural development", "https://rural.gov.in/"],
      ["Ministry of Agriculture", "Agriculture and farmers welfare", "https://agriwelfare.gov.in/"],
      ["Ministry of Labour", "Labour and employment", "https://labour.gov.in/"],
      ["Ministry of Railways", "Indian Railways", "https://indianrailways.gov.in/"],
      ["Ministry of Road Transport", "Road transport and highways", "https://morth.nic.in/"],
      ["Ministry of Communications", "Telecom and postal services", "https://dot.gov.in/"],
      ["Ministry of Electronics & IT", "Digital governance and IT policy", "https://www.meity.gov.in/"],
      ["Ministry of Consumer Affairs", "Consumer rights and public distribution", "https://consumeraffairs.nic.in/"],
      ["Ministry of Housing & Urban Affairs", "Housing and urban development", "https://mohua.gov.in/"],
      ["Ministry of Environment", "Environment and climate policy", "https://moef.gov.in/"],
      ["Ministry of Tourism", "Tourism policy", "https://tourism.gov.in/"],
      ["Ministry of Defence", "Defence administration", "https://mod.gov.in/"],
      ["Ministry of Power", "Electricity and power policy", "https://powermin.gov.in/"],
      ["Ministry of Petroleum", "Petroleum and natural gas", "https://mopng.gov.in/"],
      ["Ministry of Jal Shakti", "Water resources", "https://jalshakti-dowr.gov.in/"],
      ["Ministry of Fisheries", "Fisheries and animal husbandry", "https://dof.gov.in/"]
    ]
  },
  {
    title: "Gujarat Government & Departments",
    icon: "🟠",
    items: [
      ["Gujarat Government", "Official state government portal", "https://gujaratindia.gov.in/"],
      ["Gujarat Chief Minister Office", "Chief Minister and state administration", "https://cmogujarat.gov.in/"],
      ["Digital Gujarat", "Certificates and citizen services", "https://www.digitalgujarat.gov.in/"],
      ["Gujarat SSO", "Single sign-on citizen services", "https://gujaratsso.gujarat.gov.in/"],
      ["Gujarat Information Department", "Government news and announcements", "https://gujaratinformation.gujarat.gov.in/"],
      ["Gujarat Revenue Department", "Land and revenue services", "https://revenuedepartment.gujarat.gov.in/"],
      ["Gujarat Home Department", "Police and internal administration", "https://home.gujarat.gov.in/"],
      ["Gujarat Health Department", "State health services", "https://gujhealth.gujarat.gov.in/"],
      ["Gujarat Education Department", "Education policies and services", "https://education.gujarat.gov.in/"],
      ["Gujarat Women & Child Development", "Women and child welfare", "https://wcd.gujarat.gov.in/"],
      ["Gujarat Social Justice Department", "Social welfare schemes", "https://sje.gujarat.gov.in/"],
      ["Gujarat Agriculture Department", "Agriculture and farmer services", "https://agri.gujarat.gov.in/"],
      ["Gujarat Labour Department", "Labour and employment", "https://labour.gujarat.gov.in/"],
      ["Gujarat Urban Development", "Urban development and local bodies", "https://udd.gujarat.gov.in/"],
      ["Gujarat Panchayat Department", "Panchayat administration", "https://panchayat.gujarat.gov.in/"],
      ["Gujarat Transport Department", "Transport and RTO", "https://transport.gujarat.gov.in/"],
      ["Gujarat Forest Department", "Forest and wildlife", "https://forests.gujarat.gov.in/"],
      ["Gujarat Tourism", "State tourism", "https://www.gujarattourism.com/"],
      ["Gujarat Finance Department", "State finance and budget", "https://financedepartment.gujarat.gov.in/"],
      ["Gujarat Tribal Development", "Tribal welfare", "https://tribal.gujarat.gov.in/"],
      ["Gujarat Fisheries", "Fisheries department", "https://fisheries.gujarat.gov.in/"],
      ["Gujarat Disaster Management", "Disaster management authority", "https://gsdma.gujarat.gov.in/"]
    ]
  },
  {
    title: "Digital India & Citizen Services",
    icon: "💻",
    items: [
      ["DigiLocker", "Digital documents and certificates", "https://www.digilocker.gov.in/"],
      ["UMANG", "Central and state government services", "https://web.umang.gov.in/"],
      ["API Setu", "Government API platform", "https://apisetu.gov.in/"],
      ["National Service Portal", "Government service directory", "https://services.india.gov.in/"],
      ["Common Service Centres", "Find digital service centres", "https://csc.gov.in/"],
      ["Aadhaar Services", "UIDAI identity and update services", "https://uidai.gov.in/"],
      ["MyGov", "Government public engagement", "https://www.mygov.in/"],
      ["eDistrict Gujarat", "District citizen services", "https://www.digitalgujarat.gov.in/"],
      ["eGram Vishwagram", "Village digital services information", "https://panchayat.gujarat.gov.in/"],
      ["National e-Governance Division", "Digital government initiatives", "https://negd.gov.in/"],
      ["Open Government Data", "Government datasets", "https://data.gov.in/"]
    ]
  },
  {
    title: "Emergency, Police, Fire & Rescue",
    icon: "🚨",
    items: [
      ["112 Emergency Response", "Integrated emergency response for police, fire and medical emergencies", "https://112.gov.in/", "112"],
      ["Gujarat Police", "State police services", "https://police.gujarat.gov.in/", "100"],
      ["Ahmedabad Police", "Ahmedabad city police", "https://ahmedabadcitypolice.org/"],
      ["Fire & Emergency Services", "Fire and rescue assistance", "https://gujfiresafetycop.in/", "101"],
      ["Gujarat Disaster Management", "State disaster response", "https://gsdma.gujarat.gov.in/"],
      ["National Disaster Management", "National disaster preparedness", "https://ndma.gov.in/", "1070"],
      ["NDRF", "National Disaster Response Force", "https://ndrf.gov.in/"],
      ["District Emergency Control", "District emergency information", "https://ahmedabad.nic.in/helpline/", "1077"],
      ["Road Accident Assistance", "Road accident assistance information", "https://morth.nic.in/", "1073"],
      ["Gujarat Anti Corruption Bureau", "Report corruption", "https://acb.gujarat.gov.in/", "1064"],
      ["Railway Security / RPF", "Railway passenger safety", "https://rpf.indianrailways.gov.in/", "139"],
      ["Coast Guard", "Maritime safety and rescue", "https://indiancoastguard.gov.in/"]
    ]
  },
  {
    title: "Women Safety & Women Rights",
    icon: "👩",
    items: [
      ["Women Helpline", "Women in distress and support", "https://wcd.gov.in/", "181"],
      ["Women Police Helpline", "Women emergency assistance", "https://police.gujarat.gov.in/", "1091"],
      ["National Commission for Women", "Women rights and complaints", "https://ncw.nic.in/"],
      ["NCW Online Complaint", "Online complaint facility", "https://ncwapps.nic.in/"],
      ["Mission Shakti", "Women safety and empowerment", "https://missionshakti.wcd.gov.in/"],
      ["One Stop Centre", "Medical, police, legal and counselling support", "https://wcd.gov.in/"],
      ["Gujarat Women & Child Development", "State women protection and schemes", "https://wcd.gujarat.gov.in/"],
      ["Domestic Violence Act", "Protection of Women from Domestic Violence Act", "https://www.indiacode.nic.in/"],
      ["POSH Act", "Workplace sexual harassment prevention law", "https://www.indiacode.nic.in/"],
      ["Free Legal Aid", "Legal aid for eligible persons", "https://nalsa.gov.in/", "15100"],
      ["Cyber Crime Portal", "Report online harassment", "https://cybercrime.gov.in/"],
      ["Emergency Response", "Immediate danger and police assistance", "https://112.gov.in/", "112"]
    ]
  },
  {
    title: "Child Safety, Adoption & Child Rights",
    icon: "🧒",
    items: [
      ["Child Helpline", "Children in distress or danger", "https://www.spniwcd.wcd.gov.in/", "1098"],
      ["NCPCR", "National Commission for Protection of Child Rights", "https://ncpcr.gov.in/"],
      ["Gujarat Child Protection", "State child welfare information", "https://wcd.gujarat.gov.in/"],
      ["CARA Adoption", "Central Adoption Resource Authority", "https://cara.wcd.gov.in/"],
      ["TrackChild", "Missing and vulnerable children information", "https://trackthemissingchild.gov.in/"],
      ["POCSO Act", "Protection of Children from Sexual Offences Act", "https://www.indiacode.nic.in/"],
      ["Juvenile Justice Act", "Child care and protection law", "https://www.indiacode.nic.in/"],
      ["Right to Education Act", "Education rights for children", "https://www.indiacode.nic.in/"],
      ["U-WIN", "Immunisation programme information", "https://uwin.mohfw.gov.in/"],
      ["Poshan Tracker", "Nutrition programme information", "https://poshantracker.in/"]
    ]
  },
  {
    title: "Ambulance, Health & Medical Services",
    icon: "🚑",
    items: [
      ["Gujarat 108 Ambulance", "Emergency ambulance service", "https://nhm.gujarat.gov.in/", "108"],
      ["National Ambulance Service", "Ambulance service information", "https://nhm.gov.in/", "102"],
      ["Tele-MANAS", "Government mental health support", "https://telemanas.mohfw.gov.in/", "14416"],
      ["National Health Mission", "National public health programmes", "https://nhm.gov.in/"],
      ["Gujarat Health Department", "State health services", "https://gujhealth.gujarat.gov.in/"],
      ["Ayushman Bharat PM-JAY", "Health assurance scheme", "https://pmjay.gov.in/", "14555"],
      ["ABHA", "Digital health account", "https://abha.abdm.gov.in/"],
      ["eSanjeevani", "Online doctor consultation", "https://esanjeevani.mohfw.gov.in/"],
      ["eRaktKosh", "Blood bank information", "https://www.eraktkosh.in/"],
      ["NOTTO", "Organ and tissue donation information", "https://notto.mohfw.gov.in/"],
      ["FSSAI", "Food safety information", "https://www.fssai.gov.in/"],
      ["National AIDS Control Organisation", "HIV/AIDS information", "https://naco.gov.in/"],
      ["National Tobacco Control", "Tobacco cessation information", "https://ntcp.mohfw.gov.in/"],
      ["MA / MA Vatsalya", "Gujarat health scheme information", "https://gujhealth.gujarat.gov.in/"],
      ["PMMVY", "Maternity benefit scheme", "https://pmmvy.wcd.gov.in/"]
    ]
  },
  {
    title: "Pregnancy, Maternity & Early Childhood",
    icon: "🤰",
    items: [
      ["Civil Registration System", "Birth and death registration", "https://crsorgi.gov.in/"],
      ["Gujarat eOlakh", "Birth and death registration services", "https://eolakh.gujarat.gov.in/"],
      ["Pregnancy & Maternal Health", "National Health Mission", "https://nhm.gov.in/"],
      ["PM Matru Vandana Yojana", "Maternity benefit scheme", "https://pmmvy.wcd.gov.in/"],
      ["Poshan Tracker", "Nutrition and child development", "https://poshantracker.in/"],
      ["U-WIN", "Immunisation records and services", "https://uwin.mohfw.gov.in/"],
      ["Anganwadi Services", "Nutrition and early childhood services", "https://wcd.gov.in/"],
      ["Marriage Registration Gujarat", "Marriage registration information", "https://enagar.gujarat.gov.in/"],
      ["Special Marriage Act", "Civil marriage legal provisions", "https://www.indiacode.nic.in/"],
      ["Hindu Marriage Act", "Marriage and divorce law", "https://www.indiacode.nic.in/"],
      ["Family Courts", "Family court information", "https://ecourts.gov.in/"],
      ["CARA", "Adoption services", "https://cara.wcd.gov.in/"]
    ]
  },
  {
    title: "Cyber Crime, Fraud & Digital Security",
    icon: "🔐",
    items: [
      ["National Cyber Crime Portal", "Report cybercrime and online harassment", "https://cybercrime.gov.in/"],
      ["Cyber Financial Fraud Helpline", "Report financial cyber fraud immediately", "https://cybercrime.gov.in/", "1930"],
      ["CERT-In", "National cyber incident response", "https://www.cert-in.org.in/"],
      ["Sanchar Saathi", "Mobile and telecom security services", "https://sancharsaathi.gov.in/"],
      ["CEIR", "Block lost or stolen mobile phones", "https://ceir.sancharsaathi.gov.in/"],
      ["TAFCOP", "Check mobile connections issued in your name", "https://tafcop.sancharsaathi.gov.in/"],
      ["RBI Sachet", "Report unauthorised deposit schemes", "https://sachet.rbi.org.in/"],
      ["RBI CMS", "Banking complaints", "https://cms.rbi.org.in/"],
      ["NPCI", "UPI and digital payments information", "https://www.npci.org.in/"],
      ["MeitY", "Digital policy and cyber security", "https://www.meity.gov.in/"],
      ["Data Protection Information", "Digital personal data protection resources", "https://www.meity.gov.in/"]
    ]
  },
  {
    title: "Identity Cards & Personal Documents",
    icon: "🪪",
    items: [
      ["Aadhaar UIDAI", "Aadhaar enrolment, update and download", "https://uidai.gov.in/"],
      ["PAN Card", "Income tax PAN services", "https://www.incometax.gov.in/"],
      ["NSDL PAN", "PAN application and services", "https://www.protean-tinpan.com/"],
      ["Voter ID", "Voter registration and corrections", "https://voters.eci.gov.in/"],
      ["Passport Seva", "Passport application and renewal", "https://www.passportindia.gov.in/"],
      ["Driving Licence", "Driving licence services", "https://sarathi.parivahan.gov.in/"],
      ["Vehicle Registration", "Vehicle registration and services", "https://vahan.parivahan.gov.in/"],
      ["Ration Card", "Public distribution and ration services", "https://nfsa.gov.in/"],
      ["DigiLocker", "Digital certificates and documents", "https://www.digilocker.gov.in/"],
      ["ABHA Card", "Digital health identity", "https://abha.abdm.gov.in/"],
      ["UDID Card", "Disability identity card", "https://swavlambancard.gov.in/"],
      ["eShram Card", "Unorganised worker identity registration", "https://eshram.gov.in/"],
      ["Ayushman Card", "Health scheme beneficiary information", "https://beneficiary.nha.gov.in/"],
      ["Jeevan Pramaan", "Digital life certificate", "https://jeevanpramaan.gov.in/"],
      ["Senior Citizen Services", "State-specific senior citizen services", "https://sje.gujarat.gov.in/"],
      ["Birth Certificate", "Birth registration information", "https://crsorgi.gov.in/"],
      ["Death Certificate", "Death registration information", "https://crsorgi.gov.in/"],
      ["Marriage Certificate", "Marriage registration information", "https://enagar.gujarat.gov.in/"]
    ]
  },
  {
    title: "Government Schemes - Central India",
    icon: "🎯",
    items: [
      ["myScheme", "Search schemes by eligibility and category", "https://www.myscheme.gov.in/"],
      ["National Scheme Directory", "Central and state schemes", "https://www.india.gov.in/my-government/schemes"],
      ["PM-KISAN", "Farmer income support", "https://pmkisan.gov.in/"],
      ["PM Fasal Bima Yojana", "Crop insurance", "https://pmfby.gov.in/"],
      ["PM Awas Yojana Urban", "Urban housing assistance", "https://pmay-urban.gov.in/"],
      ["PM Awas Yojana Gramin", "Rural housing assistance", "https://pmayg.nic.in/"],
      ["PM Ujjwala Yojana", "LPG connection scheme", "https://www.pmuy.gov.in/"],
      ["PM Surya Ghar", "Rooftop solar scheme", "https://pmsuryaghar.gov.in/"],
      ["PM Vishwakarma", "Traditional artisans support", "https://pmvishwakarma.gov.in/"],
      ["PM Jan Dhan Yojana", "Financial inclusion", "https://pmjdy.gov.in/"],
      ["PM SVANidhi", "Street vendor support", "https://pmsvanidhi.mohua.gov.in/"],
      ["PM Matru Vandana", "Maternity benefit", "https://pmmvy.wcd.gov.in/"],
      ["Ayushman Bharat", "Health coverage", "https://pmjay.gov.in/"],
      ["NSAP", "Old age, widow and disability pension", "https://nsap.nic.in/"],
      ["National Scholarship Portal", "Student scholarships", "https://scholarships.gov.in/"],
      ["eShram", "Unorganised worker registration", "https://eshram.gov.in/"],
      ["Skill India", "Skill development programmes", "https://www.skillindiadigital.gov.in/"],
      ["Startup India", "Startup support", "https://www.startupindia.gov.in/"],
      ["Udyam Registration", "MSME registration", "https://udyamregistration.gov.in/"],
      ["PMJJBY & PMSBY", "Life and accident insurance schemes", "https://jansuraksha.gov.in/"],
      ["Atal Pension Yojana", "Pension scheme information", "https://www.pfrda.org.in/"],
      ["Jal Jeevan Mission", "Rural drinking water", "https://jaljeevanmission.gov.in/"],
      ["Swachh Bharat Mission", "Sanitation programme", "https://swachhbharatmission.ddws.gov.in/"],
      ["NFSA", "Food security and ration information", "https://nfsa.gov.in/"],
      ["eNAM", "National agriculture market", "https://enam.gov.in/"]
    ]
  },
  {
    title: "Gujarat Government Schemes & Benefits",
    icon: "🟠",
    items: [
      ["Digital Gujarat Schemes", "Citizen benefits and applications", "https://www.digitalgujarat.gov.in/"],
      ["e-SamajKalyan", "Social welfare schemes", "https://esamajkalyan.gujarat.gov.in/"],
      ["iKhedut", "Farmer schemes and applications", "https://ikhedut.gujarat.gov.in/"],
      ["MYSY", "Student financial assistance", "https://mysy.guj.nic.in/"],
      ["CM Scholarship / Education Support", "Gujarat education schemes", "https://education.gujarat.gov.in/"],
      ["MA / MA Vatsalya", "Gujarat health assistance information", "https://gujhealth.gujarat.gov.in/"],
      ["Gujarat Women Schemes", "Women welfare and empowerment", "https://wcd.gujarat.gov.in/"],
      ["Gujarat Child Welfare", "Child welfare schemes", "https://wcd.gujarat.gov.in/"],
      ["Gujarat Social Justice Schemes", "SC, ST, OBC and other welfare services", "https://sje.gujarat.gov.in/"],
      ["Gujarat Tribal Schemes", "Tribal development benefits", "https://tribal.gujarat.gov.in/"],
      ["Gujarat Farmer Schemes", "Agriculture department benefits", "https://agri.gujarat.gov.in/"],
      ["Gujarat Labour Welfare", "Worker welfare schemes", "https://labour.gujarat.gov.in/"],
      ["Gujarat Pension Services", "Social security and pension information", "https://sje.gujarat.gov.in/"],
      ["Gujarat Housing Schemes", "Housing and urban development", "https://udd.gujarat.gov.in/"],
      ["Gujarat Fisheries Schemes", "Fisheries assistance", "https://fisheries.gujarat.gov.in/"]
    ]
  },
  {
    title: "Education, Schools, Colleges & Scholarships",
    icon: "🎓",
    items: [
      ["DIKSHA", "Digital school learning", "https://diksha.gov.in/"],
      ["ePathshala", "NCERT textbooks and learning resources", "https://epathshala.nic.in/"],
      ["NCERT", "National Council of Educational Research", "https://ncert.nic.in/"],
      ["Gujarat State Board", "GSEB official portal", "https://www.gseb.org/"],
      ["GCERT", "Gujarat Council of Educational Research", "https://gcert.gujarat.gov.in/"],
      ["GSSTB", "Gujarat textbooks information", "https://gsstb.gujarat.gov.in/"],
      ["G-Shala", "Gujarat digital learning information", "https://gshala.schoolnetindia.com/"],
      ["NROER", "National Repository of Open Educational Resources", "https://nroer.gov.in/"],
      ["SWAYAM", "Free online courses", "https://swayam.gov.in/"],
      ["NPTEL", "Engineering and science courses", "https://nptel.ac.in/"],
      ["National Scholarship Portal", "Central scholarships", "https://scholarships.gov.in/"],
      ["MYSY", "Gujarat student assistance", "https://mysy.guj.nic.in/"],
      ["Digital Gujarat Scholarship", "State scholarships", "https://www.digitalgujarat.gov.in/"],
      ["UGC", "University Grants Commission", "https://www.ugc.gov.in/"],
      ["AICTE", "Technical education and approvals", "https://www.aicte-india.org/"],
      ["NTA", "National Testing Agency", "https://nta.ac.in/"],
      ["ABC Academic Bank of Credits", "Academic credit records", "https://abc.gov.in/"],
      ["AISHE", "Higher education statistics", "https://aishe.gov.in/"],
      ["National Digital Library", "Digital learning library", "https://ndl.iitkgp.ac.in/"],
      ["Gujarat University", "University information", "https://www.gujaratuniversity.ac.in/"]
    ]
  },
  {
    title: "Government Jobs, Recruitment & Exams",
    icon: "💼",
    items: [
      ["UPSC", "Union Public Service Commission", "https://upsc.gov.in/"],
      ["SSC", "Staff Selection Commission", "https://ssc.gov.in/"],
      ["GPSC", "Gujarat Public Service Commission", "https://gpsc.gujarat.gov.in/"],
      ["GSSSB", "Gujarat Subordinate Service Selection Board", "https://gsssb.gujarat.gov.in/"],
      ["OJAS Gujarat", "Gujarat online job application system", "https://ojas.gujarat.gov.in/"],
      ["Employment News", "Government job notifications", "https://employmentnews.gov.in/"],
      ["National Career Service", "Jobs and career services", "https://www.ncs.gov.in/"],
      ["Railway Recruitment Board", "Railway recruitment information", "https://www.rrbcdg.gov.in/"],
      ["IBPS", "Bank recruitment examinations", "https://www.ibps.in/"],
      ["SBI Careers", "State Bank recruitment", "https://sbi.co.in/web/careers"],
      ["India Post GDS", "Postal recruitment", "https://indiapostgdsonline.gov.in/"],
      ["Indian Army Recruitment", "Army recruitment", "https://joinindianarmy.nic.in/"],
      ["Indian Navy Recruitment", "Navy recruitment", "https://joinindiannavy.gov.in/"],
      ["Indian Air Force Recruitment", "Air Force recruitment", "https://agnipathvayu.cdac.in/"],
      ["Apprenticeship India", "Apprenticeship registration", "https://www.apprenticeshipindia.gov.in/"],
      ["Skill India Digital", "Skill training and certification", "https://www.skillindiadigital.gov.in/"]
    ]
  },
  {
    title: "Banks, RBI & Financial Regulators",
    icon: "🏦",
    items: [
      ["Reserve Bank of India", "Central bank of India", "https://www.rbi.org.in/"],
      ["RBI Complaint Management System", "Banking and regulated entity complaints", "https://cms.rbi.org.in/"],
      ["RBI Sachet", "Report unauthorised deposit schemes", "https://sachet.rbi.org.in/"],
      ["RBI UDGAM", "Search unclaimed deposits", "https://udgam.rbi.org.in/"],
      ["RBI Retail Direct", "Government securities investment portal", "https://rbiretaildirect.org.in/"],
      ["RBI DBIE", "Database on Indian Economy", "https://dbie.rbi.org.in/"],
      ["DICGC", "Deposit insurance information", "https://www.dicgc.org.in/"],
      ["SBI", "State Bank of India", "https://sbi.co.in/"],
      ["Bank of Baroda", "Public sector bank", "https://www.bankofbaroda.in/"],
      ["Punjab National Bank", "Public sector bank", "https://www.pnbindia.in/"],
      ["Canara Bank", "Public sector bank", "https://canarabank.com/"],
      ["Union Bank of India", "Public sector bank", "https://www.unionbankofindia.co.in/"],
      ["Indian Bank", "Public sector bank", "https://indianbank.in/"],
      ["Central Bank of India", "Public sector bank", "https://www.centralbankofindia.co.in/"],
      ["Bank of India", "Public sector bank", "https://bankofindia.co.in/"],
      ["UCO Bank", "Public sector bank", "https://www.uco.bank.in/"],
      ["Bank of Maharashtra", "Public sector bank", "https://bankofmaharashtra.in/"],
      ["Punjab & Sind Bank", "Public sector bank", "https://punjabandsind.bank.in/"],
      ["Indian Overseas Bank", "Public sector bank", "https://www.iob.in/"],
      ["IDBI Bank", "Banking services", "https://www.idbibank.in/"],
      ["NABARD", "Agriculture and rural development finance", "https://www.nabard.org/"],
      ["SIDBI", "MSME development finance", "https://www.sidbi.in/"],
      ["National Housing Bank", "Housing finance regulator", "https://www.nhb.org.in/"],
      ["NPCI", "UPI, RuPay and payment systems", "https://www.npci.org.in/"],
      ["SEBI", "Securities market regulator", "https://www.sebi.gov.in/"],
      ["PFRDA", "Pension fund regulator", "https://www.pfrda.org.in/"]
    ]
  },
  {
    title: "Banking Safety, UPI & Financial Complaints",
    icon: "🔒",
    items: [
      ["RBI CMS", "Complain about banks and regulated financial entities", "https://cms.rbi.org.in/"],
      ["RBI Sachet", "Report illegal deposit schemes", "https://sachet.rbi.org.in/"],
      ["RBI UDGAM", "Find unclaimed bank deposits", "https://udgam.rbi.org.in/"],
      ["DICGC", "Deposit insurance information", "https://www.dicgc.org.in/"],
      ["NPCI UPI", "UPI services and information", "https://www.npci.org.in/"],
      ["NPCI Complaint Information", "Payment system complaint guidance", "https://www.npci.org.in/"],
      ["Cyber Fraud Reporting", "Report online banking and UPI fraud", "https://cybercrime.gov.in/", "1930"],
      ["Income Tax Portal", "Tax and refund information", "https://www.incometax.gov.in/"],
      ["SEBI SCORES", "Investor grievance redressal", "https://scores.sebi.gov.in/"],
      ["IRDAI Bima Bharosa", "Insurance complaint portal", "https://bimabharosa.irdai.gov.in/"]
    ]
  },
  {
    title: "Insurance, LIC, EPFO & Pension",
    icon: "🛡️",
    items: [
      ["LIC India", "Life Insurance Corporation", "https://licindia.in/"],
      ["IRDAI", "Insurance regulator", "https://irdai.gov.in/"],
      ["Bima Bharosa", "Insurance grievance portal", "https://bimabharosa.irdai.gov.in/"],
      ["Jansuraksha", "PMJJBY and PMSBY information", "https://jansuraksha.gov.in/"],
      ["EPFO", "Provident fund and pension services", "https://www.epfindia.gov.in/"],
      ["EPFO Member Portal", "PF member services", "https://unifiedportal-mem.epfindia.gov.in/"],
      ["ESIC", "Employee state insurance", "https://www.esic.gov.in/"],
      ["Jeevan Pramaan", "Digital life certificate", "https://jeevanpramaan.gov.in/"],
      ["National Pension System", "NPS information", "https://www.npscra.nsdl.co.in/"],
      ["PFRDA", "Pension regulator", "https://www.pfrda.org.in/"],
      ["Atal Pension Yojana", "Pension scheme information", "https://www.pfrda.org.in/"],
      ["NSAP", "National social assistance pensions", "https://nsap.nic.in/"]
    ]
  },
  {
    title: "BSNL, Telecom, Mobile & Communication",
    icon: "📱",
    items: [
      ["BSNL Official", "Bharat Sanchar Nigam Limited", "https://www.bsnl.co.in/"],
      ["BSNL Selfcare", "BSNL account, bill and services", "https://selfcare.bsnl.co.in/"],
      ["BSNL Bharat Fibre", "Broadband and fibre services", "https://www.bsnl.co.in/"],
      ["Department of Telecommunications", "Telecom policy and administration", "https://dot.gov.in/"],
      ["TRAI", "Telecom Regulatory Authority of India", "https://www.trai.gov.in/"],
      ["Sanchar Saathi", "Mobile security and telecom services", "https://sancharsaathi.gov.in/"],
      ["CEIR", "Block lost or stolen mobile", "https://ceir.sancharsaathi.gov.in/"],
      ["TAFCOP", "Check mobile connections in your name", "https://tafcop.sancharsaathi.gov.in/"],
      ["TRAI DND", "Do Not Disturb and spam complaint information", "https://www.trai.gov.in/"],
      ["MNP Information", "Mobile number portability information", "https://www.trai.gov.in/"]
    ]
  },
  {
    title: "Post Office, Savings & Postal Banking",
    icon: "📮",
    items: [
      ["India Post", "Postal services", "https://www.indiapost.gov.in/"],
      ["Post Office Tracking", "Track postal articles", "https://www.indiapost.gov.in/"],
      ["India Post Payments Bank", "IPPB banking", "https://www.ippbonline.com/"],
      ["Post Office Savings", "Small savings information", "https://www.indiapost.gov.in/"],
      ["Public Provident Fund", "PPF information", "https://www.indiapost.gov.in/"],
      ["National Savings Certificate", "NSC information", "https://www.indiapost.gov.in/"],
      ["Sukanya Samriddhi", "Girl child savings scheme", "https://www.indiapost.gov.in/"],
      ["Senior Citizen Savings Scheme", "Senior citizen savings information", "https://www.indiapost.gov.in/"],
      ["Post Office Monthly Income Scheme", "MIS information", "https://www.indiapost.gov.in/"]
    ]
  },
  {
    title: "Railways, IRCTC & Passenger Safety",
    icon: "🚆",
    items: [
      ["Indian Railways", "Railway administration", "https://indianrailways.gov.in/"],
      ["IRCTC", "Train ticket booking", "https://www.irctc.co.in/"],
      ["NTES", "National Train Enquiry System", "https://enquiry.indianrail.gov.in/"],
      ["Rail Madad", "Railway complaints and assistance", "https://railmadad.indianrailways.gov.in/"],
      ["Railway Helpline", "Passenger assistance", "https://indianrailways.gov.in/", "139"],
      ["Western Railway", "Western Railway zone", "https://wr.indianrailways.gov.in/"],
      ["RPF", "Railway Protection Force", "https://rpf.indianrailways.gov.in/"],
      ["Railway Recruitment", "Railway recruitment information", "https://www.rrbcdg.gov.in/"]
    ]
  },
  {
    title: "Road Transport, RTO, Driving Licence & Gujarat ST",
    icon: "🚌",
    items: [
      ["Parivahan", "National transport services", "https://parivahan.gov.in/"],
      ["VAHAN", "Vehicle registration services", "https://vahan.parivahan.gov.in/"],
      ["SARATHI", "Driving licence services", "https://sarathi.parivahan.gov.in/"],
      ["mParivahan", "Transport services and vehicle information", "https://parivahan.gov.in/"],
      ["MoRTH", "Road transport and highways ministry", "https://morth.nic.in/"],
      ["GSRTC", "Gujarat State Road Transport Corporation", "https://gsrtc.in/"],
      ["Gujarat Transport Department", "State transport information", "https://transport.gujarat.gov.in/"],
      ["National Highways Authority", "National highways", "https://nhai.gov.in/"],
      ["FASTag Information", "Electronic toll collection information", "https://ihmcl.co.in/"],
      ["Road Safety", "Road safety information", "https://morth.nic.in/"]
    ]
  },
  {
    title: "Aviation, Airports & Tourism Transport",
    icon: "✈️",
    items: [
      ["Airports Authority of India", "Airport authority", "https://www.aai.aero/"],
      ["Ministry of Civil Aviation", "Civil aviation policy", "https://www.civilaviation.gov.in/"],
      ["AirSewa", "Air passenger grievance portal", "https://airsewa.gov.in/"],
      ["DigiYatra", "Digital airport travel services", "https://www.digiyatra.com/"],
      ["Incredible India", "National tourism portal", "https://www.incredibleindia.gov.in/"],
      ["Gujarat Tourism", "State tourism portal", "https://www.gujarattourism.com/"]
    ]
  },
  {
    title: "Ration Card, Food Security & Consumer Affairs",
    icon: "🍚",
    items: [
      ["NFSA", "National Food Security Act and ration information", "https://nfsa.gov.in/"],
      ["One Nation One Ration Card", "Ration portability information", "https://impds.nic.in/"],
      ["Gujarat Food & Civil Supplies", "State ration and food department", "https://dcs-dof.gujarat.gov.in/"],
      ["Consumer Affairs", "Consumer protection department", "https://consumeraffairs.nic.in/"],
      ["National Consumer Helpline", "Consumer grievance assistance", "https://consumerhelpline.gov.in/", "1915"],
      ["e-Jagriti", "Consumer dispute redressal", "https://e-jagriti.gov.in/"],
      ["BIS", "Standards and product certification", "https://www.bis.gov.in/"],
      ["FSSAI", "Food safety and standards", "https://www.fssai.gov.in/"]
    ]
  },
  {
    title: "Agriculture, Farmers, Dairy & Fisheries",
    icon: "🌾",
    items: [
      ["PM-KISAN", "Farmer income support", "https://pmkisan.gov.in/"],
      ["iKhedut Gujarat", "Gujarat farmer schemes", "https://ikhedut.gujarat.gov.in/"],
      ["Agriculture Gujarat", "State agriculture department", "https://agri.gujarat.gov.in/"],
      ["PM Fasal Bima", "Crop insurance", "https://pmfby.gov.in/"],
      ["eNAM", "National agriculture market", "https://enam.gov.in/"],
      ["Kisan Call Centre", "Farmer information and advice", "https://agriwelfare.gov.in/", "1800-180-1551"],
      ["Kisan Credit Card", "Agriculture credit information", "https://www.nabard.org/"],
      ["Soil Health Card", "Soil testing and health information", "https://soilhealth.dac.gov.in/"],
      ["National Horticulture Board", "Horticulture development", "https://nhb.gov.in/"],
      ["Animal Husbandry", "Livestock and animal husbandry services", "https://dahd.gov.in/"],
      ["Fisheries Department", "Fisheries schemes", "https://dof.gov.in/"],
      ["Amul", "Gujarat dairy cooperative information", "https://www.amul.com/"]
    ]
  },
  {
    title: "Land Records, Property, Registration & Housing",
    icon: "🏠",
    items: [
      ["AnyROR Gujarat", "Rural land records", "https://anyror.gujarat.gov.in/"],
      ["GARVI Gujarat", "Property registration and valuation", "https://garvi.gujarat.gov.in/"],
      ["Revenue Department", "Land revenue services", "https://revenuedepartment.gujarat.gov.in/"],
      ["eDhara", "Land record services information", "https://revenuedepartment.gujarat.gov.in/"],
      ["IGR Gujarat", "Registration and stamps information", "https://garvi.gujarat.gov.in/"],
      ["GujRERA", "Real estate regulatory authority", "https://gujrera.gujarat.gov.in/"],
      ["PMAY Urban", "Urban housing scheme", "https://pmay-urban.gov.in/"],
      ["PMAY Gramin", "Rural housing scheme", "https://pmayg.nic.in/"],
      ["eNagar Gujarat", "Municipal services and property tax", "https://enagar.gujarat.gov.in/"],
      ["Jal Jeevan Mission", "Drinking water programme", "https://jaljeevanmission.gov.in/"],
      ["Swachh Bharat Mission", "Sanitation services", "https://swachhbharatmission.ddws.gov.in/"]
    ]
  },
  {
    title: "Housing, Water, Sanitation & Urban Civic Services",
    icon: "🚰",
    items: [
      ["Ministry of Housing & Urban Affairs", "Urban development and housing", "https://mohua.gov.in/"],
      ["PMAY Urban", "Urban housing scheme information", "https://pmay-urban.gov.in/"],
      ["PMAY Gramin", "Rural housing scheme information", "https://pmayg.nic.in/"],
      ["eNagar Gujarat", "Municipal services and property tax", "https://enagar.gujarat.gov.in/"],
      ["Jal Jeevan Mission", "Rural drinking water programme", "https://jaljeevanmission.gov.in/"],
      ["Swachh Bharat Mission", "Sanitation programme", "https://swachhbharatmission.ddws.gov.in/"],
      ["AMRUT Mission", "Urban water and infrastructure information", "https://mohua.gov.in/"],
      ["Gujarat Urban Development", "Urban local body information", "https://udd.gujarat.gov.in/"],
      ["Gujarat Panchayat Department", "Village and panchayat services", "https://panchayat.gujarat.gov.in/"]
    ]
  },
  {
    title: "Electricity, Gas, Water & Energy",
    icon: "⚡",
    items: [
      ["GUVNL", "Gujarat Urja Vikas Nigam", "https://www.guvnl.com/"],
      ["PGVCL", "Paschim Gujarat Vij Company", "https://www.pgvcl.com/"],
      ["MGVCL", "Madhya Gujarat Vij Company", "https://www.mgvcl.com/"],
      ["DGVCL", "Dakshin Gujarat Vij Company", "https://www.dgvcl.com/"],
      ["UGVCL", "Uttar Gujarat Vij Company", "https://www.ugvcl.com/"],
      ["GSECL", "Gujarat State Electricity Corporation", "https://www.gsecl.in/"],
      ["GERC", "Gujarat Electricity Regulatory Commission", "https://gercin.org/"],
      ["PM Surya Ghar", "Rooftop solar scheme", "https://pmsuryaghar.gov.in/"],
      ["Ministry of Power", "National power policy", "https://powermin.gov.in/"],
      ["Petroleum & Natural Gas", "National petroleum information", "https://mopng.gov.in/"],
      ["Jal Shakti", "Water resources and drinking water", "https://jalshakti-dowr.gov.in/"],
      ["Jal Jeevan Mission", "Rural drinking water", "https://jaljeevanmission.gov.in/"]
    ]
  },
  {
    title: "Environment, Forest, Pollution & Wildlife",
    icon: "🌳",
    items: [
      ["MoEFCC", "Environment, Forest and Climate Change", "https://moef.gov.in/"],
      ["CPCB", "Central Pollution Control Board", "https://cpcb.nic.in/"],
      ["GPCB", "Gujarat Pollution Control Board", "https://gpcb.gujarat.gov.in/"],
      ["Gujarat Forest Department", "Forest and wildlife", "https://forests.gujarat.gov.in/"],
      ["National Green Tribunal", "Environmental justice", "https://greentribunal.gov.in/"],
      ["Wildlife Crime Control Bureau", "Wildlife crime information", "https://wccb.gov.in/"],
      ["Climate Change", "National climate policy information", "https://moef.gov.in/"]
    ]
  },
  {
    title: "Taxation, GST, Income Tax & Customs",
    icon: "🧾",
    items: [
      ["Income Tax Department", "Income tax return and services", "https://www.incometax.gov.in/"],
      ["GST Portal", "GST registration, returns and payments", "https://www.gst.gov.in/"],
      ["GST Council", "GST policy and decisions", "https://gstcouncil.gov.in/"],
      ["CBIC", "Central Board of Indirect Taxes and Customs", "https://www.cbic.gov.in/"],
      ["ICEGATE", "Customs electronic services", "https://www.icegate.gov.in/"],
      ["TDS TRACES", "TDS services", "https://www.tdscpc.gov.in/"],
      ["PAN Services", "PAN application and corrections", "https://www.protean-tinpan.com/"],
      ["GST Grievance", "GST help and grievance information", "https://selfservice.gstsystem.in/"]
    ]
  },
  {
    title: "Business, MSME, Startup, Trade & Tenders",
    icon: "🏢",
    items: [
      ["MCA", "Ministry of Corporate Affairs", "https://www.mca.gov.in/"],
      ["Udyam Registration", "MSME registration", "https://udyamregistration.gov.in/"],
      ["Startup India", "Startup recognition and support", "https://www.startupindia.gov.in/"],
      ["GeM", "Government e-Marketplace", "https://gem.gov.in/"],
      ["eProcurement India", "Central government tenders", "https://eprocure.gov.in/"],
      ["Gujarat Tenders", "State tender information", "https://tender.nprocure.com/"],
      ["ICEGATE", "Import and export customs", "https://www.icegate.gov.in/"],
      ["DGFT", "Foreign trade policy and services", "https://www.dgft.gov.in/"],
      ["MSME Ministry", "MSME schemes and policies", "https://msme.gov.in/"],
      ["SIDBI", "MSME finance and development", "https://www.sidbi.in/"],
      ["FSSAI Licensing", "Food business licensing information", "https://foscos.fssai.gov.in/"],
      ["GST Portal", "Business tax compliance", "https://www.gst.gov.in/"]
    ]
  },
  {
    title: "Grievance, RTI, Vigilance & Anti-Corruption",
    icon: "📢",
    items: [
      ["CPGRAMS", "Central government public grievance", "https://pgportal.gov.in/"],
      ["RTI Online", "Central public authority RTI applications", "https://rtionline.gov.in/"],
      ["Gujarat SWAGAT", "State grievance redressal", "https://swagat.gujarat.gov.in/"],
      ["Gujarat Information Commission", "RTI appeals and information", "https://gic.gujarat.gov.in/"],
      ["Central Information Commission", "RTI appeals and complaints", "https://cic.gov.in/"],
      ["Central Vigilance Commission", "Vigilance complaints and guidance", "https://cvc.gov.in/"],
      ["CBI", "Central Bureau of Investigation", "https://cbi.gov.in/"],
      ["Gujarat ACB", "State anti-corruption information", "https://acb.gujarat.gov.in/"],
      ["NHRC", "Human rights complaints", "https://nhrc.nic.in/"],
      ["National Consumer Helpline", "Consumer complaints", "https://consumerhelpline.gov.in/"],
      ["RBI CMS", "Banking complaints", "https://cms.rbi.org.in/"],
      ["Bima Bharosa", "Insurance complaints", "https://bimabharosa.irdai.gov.in/"]
    ]
  },
  {
    title: "Courts, Legal Aid & Judiciary",
    icon: "⚖️",
    items: [
      ["Supreme Court of India", "Supreme Court information and services", "https://www.sci.gov.in/"],
      ["eCourts Services", "District and subordinate court services", "https://ecourts.gov.in/"],
      ["Gujarat High Court", "High Court of Gujarat", "https://gujarathighcourt.nic.in/"],
      ["Gujarat District Courts", "District judiciary information", "https://gujarat.dcourts.gov.in/"],
      ["NALSA", "National legal services authority", "https://nalsa.gov.in/"],
      ["Gujarat State Legal Services Authority", "State legal aid", "https://gujarat.nalsa.gov.in/"],
      ["India Code", "Acts, rules and regulations", "https://www.indiacode.nic.in/"],
      ["Legislative Department", "Legislation and legal publications", "https://legislative.gov.in/"],
      ["National Judicial Data Grid", "Court case statistics", "https://njdg.ecourts.gov.in/"],
      ["e-Filing", "Electronic court filing information", "https://efiling.ecourts.gov.in/"]
    ]
  },
  {
    title: "Indian Constitution & Fundamental Rights",
    icon: "📕",
    items: [
      ["Constitution of India", "Constitution and amendments", "https://legislative.gov.in/constitution-of-india/"],
      ["India Code", "Constitution and central legislation", "https://www.indiacode.nic.in/"],
      ["Fundamental Rights", "Constitutional rights information", "https://legislative.gov.in/"],
      ["Directive Principles", "Directive principles of state policy", "https://legislative.gov.in/"],
      ["Fundamental Duties", "Article 51A information", "https://legislative.gov.in/"],
      ["Parliament of India", "Lok Sabha and Rajya Sabha", "https://sansad.in/"],
      ["Election Commission", "Electoral rights and election information", "https://eci.gov.in/"]
    ]
  },
  {
    title: "Criminal Laws - BNS, BNSS, BSA & Police Procedure",
    icon: "🚔",
    items: [
      ["Bharatiya Nyaya Sanhita 2023", "New criminal offences and punishments", "https://www.indiacode.nic.in/"],
      ["Bharatiya Nagarik Suraksha Sanhita 2023", "Criminal procedure and investigation", "https://www.indiacode.nic.in/"],
      ["Bharatiya Sakshya Adhiniyam 2023", "Evidence law", "https://www.indiacode.nic.in/"],
      ["Indian Penal Code 1860", "Historical IPC text and reference", "https://www.indiacode.nic.in/"],
      ["Code of Criminal Procedure 1973", "Historical CrPC reference", "https://www.indiacode.nic.in/"],
      ["Indian Evidence Act 1872", "Historical evidence law reference", "https://www.indiacode.nic.in/"],
      ["NCRB", "Criminal law resources and statistics", "https://www.ncrb.gov.in/"],
      ["MHA", "Home affairs and criminal law information", "https://www.mha.gov.in/"],
      ["Gujarat Police", "Police administration", "https://police.gujarat.gov.in/"]
    ]
  },
  {
    title: "Important Indian Acts & Laws",
    icon: "📚",
    items: [
      ["Right to Information Act 2005", "Information access law", "https://www.indiacode.nic.in/"],
      ["Consumer Protection Act 2019", "Consumer rights and remedies", "https://www.indiacode.nic.in/"],
      ["Information Technology Act 2000", "Cyber and electronic records law", "https://www.indiacode.nic.in/"],
      ["Digital Personal Data Protection Act 2023", "Personal digital data protection law", "https://www.indiacode.nic.in/"],
      ["Domestic Violence Act 2005", "Protection from domestic violence", "https://www.indiacode.nic.in/"],
      ["POSH Act 2013", "Workplace sexual harassment law", "https://www.indiacode.nic.in/"],
      ["POCSO Act 2012", "Child sexual offence protection", "https://www.indiacode.nic.in/"],
      ["Juvenile Justice Act 2015", "Child care and protection", "https://www.indiacode.nic.in/"],
      ["Right to Education Act 2009", "Education rights", "https://www.indiacode.nic.in/"],
      ["Motor Vehicles Act 1988", "Road transport and traffic law", "https://www.indiacode.nic.in/"],
      ["Environment Protection Act 1986", "Environmental protection", "https://www.indiacode.nic.in/"],
      ["Hindu Marriage Act 1955", "Marriage and divorce", "https://www.indiacode.nic.in/"],
      ["Special Marriage Act 1954", "Civil marriage", "https://www.indiacode.nic.in/"],
      ["Hindu Succession Act 1956", "Inheritance and succession", "https://www.indiacode.nic.in/"],
      ["Registration Act 1908", "Document registration", "https://www.indiacode.nic.in/"],
      ["Transfer of Property Act 1882", "Property transfer law", "https://www.indiacode.nic.in/"],
      ["Indian Contract Act 1872", "Contract law", "https://www.indiacode.nic.in/"],
      ["Companies Act 2013", "Company law", "https://www.indiacode.nic.in/"],
      ["Insolvency and Bankruptcy Code 2016", "Insolvency law", "https://www.indiacode.nic.in/"],
      ["SC/ST Prevention of Atrocities Act", "Protection against atrocities", "https://www.indiacode.nic.in/"],
      ["Land Acquisition Act 2013", "Land acquisition and compensation", "https://www.indiacode.nic.in/"],
      ["Labour Codes", "Central labour codes and updates", "https://labour.gov.in/"],
      ["EPF & MP Act", "Provident fund law", "https://www.epfindia.gov.in/"]
    ]
  },
  {
    title: "Government Rules, Policies, GRs, Circulars & Gazette",
    icon: "📜",
    items: [
      ["India Code", "Central and state Acts, rules and regulations", "https://www.indiacode.nic.in/"],
      ["eGazette of India", "Official central Gazette notifications", "https://egazette.gov.in/"],
      ["Legislative Department", "Bills, Acts and legislative publications", "https://legislative.gov.in/"],
      ["PIB", "Official government announcements", "https://pib.gov.in/"],
      ["DoPT", "Government employee rules, orders and circulars", "https://dopt.gov.in/"],
      ["Department of Expenditure", "Financial rules, orders and circulars", "https://doe.gov.in/"],
      ["General Financial Rules", "Central government procurement and finance rules", "https://doe.gov.in/"],
      ["DARPG", "Administrative reforms and governance policy", "https://darpg.gov.in/"],
      ["CVC Circulars", "Vigilance guidelines and circulars", "https://cvc.gov.in/"],
      ["RBI Notifications", "Banking circulars and monetary policy", "https://www.rbi.org.in/"],
      ["SEBI Regulations", "Securities market regulations", "https://www.sebi.gov.in/"],
      ["TRAI Regulations", "Telecom rules and regulations", "https://www.trai.gov.in/"],
      ["IRDAI Regulations", "Insurance rules and regulations", "https://irdai.gov.in/"],
      ["Gujarat Government", "State policies and notifications directory", "https://gujaratindia.gov.in/"],
      ["Gujarat Revenue GRs", "Revenue department resolutions", "https://revenuedepartment.gujarat.gov.in/"],
      ["Gujarat Social Justice GRs", "Social welfare resolutions", "https://sje.gujarat.gov.in/"],
      ["Gujarat Urban Development", "Urban rules and notifications", "https://udd.gujarat.gov.in/"],
      ["Gujarat Education Department", "Education circulars and notifications", "https://education.gujarat.gov.in/"],
      ["Gujarat Labour Department", "Labour rules and notifications", "https://labour.gujarat.gov.in/"]
    ]
  },
  {
    title: "Government Employees, Pension & Service Rules",
    icon: "👨‍💼",
    items: [
      ["DoPT", "Central government service rules", "https://dopt.gov.in/"],
      ["Department of Pension & Pensioners' Welfare", "Pension rules and services", "https://doppw.gov.in/"],
      ["Central Pension Accounting Office", "Pension administration", "https://cpao.nic.in/"],
      ["Bhavishya", "Pension tracking and retirement services", "https://bhavishya.nic.in/"],
      ["Jeevan Pramaan", "Digital life certificate", "https://jeevanpramaan.gov.in/"],
      ["EPFO", "Provident fund and employee pension", "https://www.epfindia.gov.in/"],
      ["Gujarat Finance Department", "State employee finance and service information", "https://financedepartment.gujarat.gov.in/"],
      ["Gujarat Government Employees", "State employee information directory", "https://gujaratindia.gov.in/"]
    ]
  },
  {
    title: "Defence, Ex-Servicemen & Veterans",
    icon: "🪖",
    items: [
      ["Indian Army", "Army official portal", "https://indianarmy.nic.in/"],
      ["Join Indian Army", "Army recruitment", "https://joinindianarmy.nic.in/"],
      ["Indian Navy", "Navy official portal", "https://indiannavy.nic.in/"],
      ["Join Indian Navy", "Navy recruitment", "https://joinindiannavy.gov.in/"],
      ["Indian Air Force", "Air Force official portal", "https://indianairforce.nic.in/"],
      ["Air Force Recruitment", "Air Force recruitment", "https://agnipathvayu.cdac.in/"],
      ["Ministry of Defence", "Defence policy and administration", "https://mod.gov.in/"],
      ["Department of Ex-Servicemen Welfare", "Veteran welfare", "https://desw.gov.in/"],
      ["Kendriya Sainik Board", "Ex-servicemen welfare", "https://ksb.gov.in/"],
      ["ECHS", "Ex-servicemen health scheme", "https://www.echs.gov.in/"]
    ]
  },
  {
    title: "Districts, Municipalities, Panchayats & Local Government",
    icon: "🏘️",
    items: [
      ["Gujarat District Directory", "All district official portals", "https://gujarat.s3waas.gov.in/"],
      ["Ahmedabad District", "District administration", "https://ahmedabad.nic.in/"],
      ["Surat District", "District administration", "https://surat.nic.in/"],
      ["Vadodara District", "District administration", "https://vadodara.nic.in/"],
      ["Rajkot District", "District administration", "https://rajkot.nic.in/"],
      ["Gandhinagar District", "District administration", "https://gandhinagar.nic.in/"],
      ["Kutch District", "District administration", "https://kachchh.nic.in/"],
      ["Bhavnagar District", "District administration", "https://bhavnagar.nic.in/"],
      ["Jamnagar District", "District administration", "https://jamnagar.nic.in/"],
      ["Junagadh District", "District administration", "https://junagadh.nic.in/"],
      ["Anand District", "District administration", "https://anand.nic.in/"],
      ["Kheda District", "District administration", "https://kheda.nic.in/"],
      ["Mehsana District", "District administration", "https://mehsana.nic.in/"],
      ["Panchmahal District", "District administration", "https://panchmahals.nic.in/"],
      ["Banaskantha District", "District administration", "https://banaskantha.nic.in/"],
      ["Patan District", "District administration", "https://patan.nic.in/"],
      ["Navsari District", "District administration", "https://navsari.nic.in/"],
      ["Valsad District", "District administration", "https://valsad.nic.in/"],
      ["Bharuch District", "District administration", "https://bharuch.nic.in/"],
      ["Narmada District", "District administration", "https://narmada.nic.in/"],
      ["Dahod District", "District administration", "https://dahod.nic.in/"],
      ["Aravalli District", "District administration", "https://aravalli.nic.in/"],
      ["Botad District", "District administration", "https://botad.nic.in/"],
      ["Chhota Udepur District", "District administration", "https://chhotaudepur.nic.in/"],
      ["Devbhumi Dwarka District", "District administration", "https://devbhumidwarka.nic.in/"],
      ["Gir Somnath District", "District administration", "https://girsomnath.nic.in/"],
      ["Mahisagar District", "District administration", "https://mahisagar.nic.in/"],
      ["Morbi District", "District administration", "https://morbi.nic.in/"],
      ["Tapi District", "District administration", "https://tapi.nic.in/"],
      ["Dang District", "District administration", "https://dangs.nic.in/"],
      ["Amreli District", "District administration", "https://amreli.nic.in/"],
      ["Surendranagar District", "District administration", "https://surendranagar.nic.in/"],
      ["Gujarat Municipal Services", "Municipal and urban local body services", "https://enagar.gujarat.gov.in/"],
      ["Gujarat Panchayat Department", "Village and district panchayat directory", "https://panchayat.gujarat.gov.in/"],
      ["National Panchayat Portal", "Panchayat information", "https://panchayat.gov.in/"],
      ["eGramSwaraj", "Panchayat planning and accounting", "https://egramswaraj.gov.in/"]
    ]
  },
  {
    title: "Public Sector, Regulators & National Authorities",
    icon: "🏢",
    items: [
      ["Election Commission of India", "National election authority", "https://eci.gov.in/"],
      ["CAG", "Comptroller and Auditor General", "https://cag.gov.in/"],
      ["NITI Aayog", "National policy think tank", "https://www.niti.gov.in/"],
      ["CVC", "Central Vigilance Commission", "https://cvc.gov.in/"],
      ["CBI", "Central Bureau of Investigation", "https://cbi.gov.in/"],
      ["NHAI", "National Highways Authority", "https://nhai.gov.in/"],
      ["FCI", "Food Corporation of India", "https://fci.gov.in/"],
      ["UIDAI", "Aadhaar authority", "https://uidai.gov.in/"],
      ["NHA", "National Health Authority", "https://nha.gov.in/"],
      ["NCPCR", "Child rights authority", "https://ncpcr.gov.in/"],
      ["NHRC", "Human rights authority", "https://nhrc.nic.in/"],
      ["BIS", "Bureau of Indian Standards", "https://www.bis.gov.in/"],
      ["FSSAI", "Food safety authority", "https://www.fssai.gov.in/"],
      ["TRAI", "Telecom regulator", "https://www.trai.gov.in/"],
      ["SEBI", "Securities regulator", "https://www.sebi.gov.in/"],
      ["IRDAI", "Insurance regulator", "https://irdai.gov.in/"],
      ["PFRDA", "Pension regulator", "https://www.pfrda.org.in/"]
    ]
  },
  {
    title: "Tourism, Culture, Heritage & Religious Sites",
    icon: "🏛️",
    items: [
      ["Gujarat Tourism", "State tourism", "https://www.gujarattourism.com/"],
      ["Incredible India", "National tourism portal", "https://www.incredibleindia.gov.in/"],
      ["Archaeological Survey of India", "Monuments and heritage", "https://asi.nic.in/"],
      ["Ministry of Culture", "Culture and heritage policy", "https://indiaculture.gov.in/"],
      ["National Archives of India", "Historical records", "https://nationalarchives.nic.in/"],
      ["IRCTC Tourism", "Railway tourism", "https://www.irctctourism.com/"],
      ["Tourist Helpline", "Tourist assistance information", "https://www.incredibleindia.gov.in/", "1363"]
    ]
  },
  {
    title: "Official Helpline Directory",
    icon: "☎️",
    items: [
      ["Integrated Emergency", "All emergency services", "https://112.gov.in/", "112"],
      ["Police", "Police assistance; use 112 for emergency", "https://police.gujarat.gov.in/", "100"],
      ["Fire Brigade", "Fire emergency; local service availability varies", "https://gujfiresafetycop.in/", "101"],
      ["Gujarat Ambulance", "Emergency ambulance", "https://nhm.gujarat.gov.in/", "108"],
      ["National Ambulance", "Ambulance assistance information", "https://nhm.gov.in/", "102"],
      ["Women Helpline", "Women support", "https://wcd.gov.in/", "181"],
      ["Women Police Helpline", "Local availability varies", "https://police.gujarat.gov.in/", "1091"],
      ["Child Helpline", "Child protection", "https://www.spniwcd.wcd.gov.in/", "1098"],
      ["Cyber Fraud", "Financial cyber fraud reporting", "https://cybercrime.gov.in/", "1930"],
      ["Consumer Helpline", "Consumer complaints", "https://consumerhelpline.gov.in/", "1915"],
      ["Senior Citizen Helpline", "Senior citizen support", "https://socialjustice.gov.in/", "14567"],
      ["Tele-MANAS", "Mental health support", "https://telemanas.mohfw.gov.in/", "14416"],
      ["Free Legal Aid", "Legal assistance", "https://nalsa.gov.in/", "15100"],
      ["Disaster Relief", "Disaster assistance information", "https://ndma.gov.in/", "1070"],
      ["District Emergency", "District control room; verify local number", "https://ahmedabad.nic.in/helpline/", "1077"],
      ["Road Accident", "Road accident assistance information", "https://morth.nic.in/", "1073"],
      ["LPG Leak", "LPG emergency assistance", "https://mopng.gov.in/", "1906"],
      ["Railway Assistance", "Railway passenger help", "https://railmadad.indianrailways.gov.in/", "139"],
      ["Aadhaar UIDAI", "Aadhaar helpdesk", "https://uidai.gov.in/", "1947"],
      ["Tourist Assistance", "Tourist helpdesk", "https://www.incredibleindia.gov.in/", "1363"],
      ["Gujarat Citizen Call Centre", "Citizen service information; verify current availability", "https://gujaratindia.gov.in/", "155303"],
      ["Kisan Call Centre", "Farmer information", "https://agriwelfare.gov.in/", "1800-180-1551"],
      ["Narcotics MANAS", "Narcotics-related assistance information", "https://www.mha.gov.in/", "1933"]
    ]
  }
];

const helplines = [
  ["Integrated Emergency", "112", "https://112.gov.in/"],
  ["Police", "100", "https://police.gujarat.gov.in/"],
  ["Fire Brigade", "101", "https://gujfiresafetycop.in/"],
  ["Ambulance Gujarat", "108", "https://nhm.gujarat.gov.in/"],
  ["National Ambulance", "102", "https://nhm.gov.in/"],
  ["Women Helpline", "181", "https://wcd.gov.in/"],
  ["Women Police Helpline", "1091", "https://police.gujarat.gov.in/"],
  ["Child Helpline", "1098", "https://www.spniwcd.wcd.gov.in/"],
  ["Cyber Financial Fraud", "1930", "https://cybercrime.gov.in/"],
  ["Consumer Helpline", "1915", "https://consumerhelpline.gov.in/"],
  ["Senior Citizen", "14567", "https://socialjustice.gov.in/"],
  ["Tele-MANAS", "14416", "https://telemanas.mohfw.gov.in/"],
  ["Free Legal Aid", "15100", "https://nalsa.gov.in/"],
  ["Disaster Relief", "1070", "https://ndma.gov.in/"],
  ["District Emergency", "1077", "https://ahmedabad.nic.in/helpline/"],
  ["Road Accident", "1073", "https://morth.nic.in/"],
  ["LPG Leak", "1906", "https://mopng.gov.in/"],
  ["Railway Help", "139", "https://railmadad.indianrailways.gov.in/"],
  ["Aadhaar", "1947", "https://uidai.gov.in/"],
  ["Tourist Help", "1363", "https://www.incredibleindia.gov.in/"],
  ["Kisan Call Centre", "1800-180-1551", "https://agriwelfare.gov.in/"]
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    fontFamily: "Arial, sans-serif",
    color: "#172033",
    padding: 16
  },
  container: {
    maxWidth: 1500,
    margin: "0 auto"
  },
  hero: {
    background: "linear-gradient(135deg,#102a56,#145a8d)",
    color: "#fff",
    padding: "30px 22px",
    borderRadius: 20,
    marginBottom: 18
  },
  search: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    fontSize: 16,
    boxSizing: "border-box",
    outline: "none"
  },
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 9,
    minWidth: 0,
    boxShadow: "0 2px 8px rgba(15,23,42,.04)"
  },
  button: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    padding: "9px 12px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 13
  },
  link: {
    display: "inline-block",
    background: "#155eaa",
    color: "#fff",
    textDecoration: "none",
    padding: "9px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    alignSelf: "flex-start"
  }
};

export default function GovtPortal() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");
  const [showHelplines, setShowHelplines] = useState(false);
  const [onlyPhone, setOnlyPhone] = useState(false);

  const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sections
      .filter(section => active === "All" || section.title === active)
      .map(section => ({
        ...section,
        items: section.items.filter(item => {
          const itemText = item.join(" ").toLowerCase();

          return (
            (!query || itemText.includes(query)) &&
            (!onlyPhone || Boolean(item[3]))
          );
        })
      }))
      .filter(section => section.items.length > 0);
  }, [search, active, onlyPhone]);

  const clearFilters = () => {
    setSearch("");
    setActive("All");
    setOnlyPhone(false);
  };

  const totalMatching = filtered.reduce(
    (total, section) => total + section.items.length,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.hero}>
          <div style={{
            fontSize: 13,
            letterSpacing: 2,
            fontWeight: 700,
            opacity: 0.85
          }}>
            INDIA • GUJARAT • CITIZEN SERVICES
          </div>

          <h1 style={{
            fontSize: "clamp(27px,5vw,44px)",
            margin: "12px 0"
          }}>
            🇮🇳 Government Super Portal
          </h1>

          <p style={{
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 900,
            margin: 0
          }}>
            One place to discover government departments, citizen services,
            identity documents, schemes, laws, policies, emergency contacts
            and official portals.
          </p>

          <div style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 22
          }}>
            {[
              ["Sections", sections.length],
              ["Listed services", totalItems],
              ["Helplines", helplines.length]
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,.14)",
                  padding: "11px 16px",
                  borderRadius: 12,
                  minWidth: 110
                }}
              >
                <div style={{ fontSize: 23, fontWeight: 800 }}>
                  {value}
                </div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <section style={{
          background: "#fff",
          padding: 16,
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          marginBottom: 16
        }}>
          <input
            style={styles.search}
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search: 108, BSNL, RBI, Aadhaar, PM Kisan, BNS, RTI, pension, land..."
            aria-label="Search government services"
          />

          <div style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 12
          }}>
            <button
              style={{
                ...styles.button,
                background: onlyPhone ? "#155eaa" : "#fff",
                color: onlyPhone ? "#fff" : "#172033"
              }}
              onClick={() => setOnlyPhone(value => !value)}
            >
              ☎ {onlyPhone ? "Show all services" : "Show helplines only"}
            </button>

            <button style={styles.button} onClick={clearFilters}>
              Reset filters
            </button>

            <button
              style={{
                ...styles.button,
                background: showHelplines ? "#fff7ed" : "#fff"
              }}
              onClick={() => setShowHelplines(value => !value)}
            >
              {showHelplines ? "Hide" : "Show"} emergency number panel
            </button>
          </div>
        </section>

        {showHelplines && (
          <section style={{
            background: "#fff",
            border: "1px solid #fecaca",
            borderRadius: 16,
            padding: 16,
            marginBottom: 18
          }}>
            <h2 style={{ marginTop: 0 }}>
              🚨 Important Government Helplines
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
              gap: 10
            }}>
              {helplines.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    padding: 12
                  }}
                >
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {item[0]}
                  </div>

                  <div style={{
                    fontSize: 25,
                    fontWeight: 800,
                    margin: "4px 0"
                  }}>
                    {item[1]}
                  </div>

                  <a
                    href={item[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "#155eaa" }}
                  >
                    Official information ↗
                  </a>
                </div>
              ))}
            </div>

            <p style={{
              fontSize: 12,
              color: "#9f1239",
              marginBottom: 0
            }}>
              In an immediate emergency, call 112. Some helplines may have
              state-specific availability or updated routing.
            </p>
          </section>
        )}

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 20 }}>
            Browse by Government Department / Service
          </h2>

          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => setActive("All")}
              style={{
                ...styles.button,
                background: active === "All" ? "#155eaa" : "#fff",
                color: active === "All" ? "#fff" : "#172033"
              }}
            >
              All Sections
            </button>

            {sections.map(section => (
              <button
                key={section.title}
                onClick={() => setActive(section.title)}
                style={{
                  ...styles.button,
                  background: active === section.title ? "#155eaa" : "#fff",
                  color: active === section.title ? "#fff" : "#172033"
                }}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </div>
        </section>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          margin: "18px 0"
        }}>
          <h2 style={{ margin: 0 }}>
            Government Services Directory
          </h2>

          <span style={{ fontSize: 13, color: "#64748b" }}>
            {totalMatching} matching services
          </span>
        </div>

        {filtered.length === 0 && (
          <div style={{
            background: "#fff",
            padding: 30,
            borderRadius: 14,
            textAlign: "center"
          }}>
            <h3>No matching service found</h3>
            <p>Try another keyword or reset the filters.</p>
            <button style={styles.button} onClick={clearFilters}>
              Clear Search
            </button>
          </div>
        )}

        {filtered.map(section => (
          <section
            key={section.title}
            style={{
              marginBottom: 28,
              scrollMarginTop: 20
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12
            }}>
              <span style={{ fontSize: 26 }}>
                {section.icon}
              </span>

              <h2 style={{ fontSize: 20, margin: 0 }}>
                {section.title}
              </h2>

              <span style={{ fontSize: 12, color: "#64748b" }}>
                ({section.items.length})
              </span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,245px),1fr))",
              gap: 12
            }}>
              {section.items.map((item, index) => (
                <article
                  key={`${item[0]}-${index}`}
                  style={styles.card}
                >
                  <div style={{
                    fontWeight: 750,
                    fontSize: 15,
                    lineHeight: 1.35
                  }}>
                    {item[0]}
                  </div>

                  <div style={{
                    fontSize: 13,
                    color: "#64748b",
                    lineHeight: 1.5,
                    flex: 1
                  }}>
                    {item[1]}
                  </div>

                  {item[3] && (
                    <a
                      href={`tel:${item[3].replace(/[^0-9+]/g, "")}`}
                      style={{
                        background: "#fff1f2",
                        color: "#be123c",
                        borderRadius: 8,
                        padding: "7px 10px",
                        fontWeight: 800,
                        alignSelf: "flex-start",
                        textDecoration: "none"
                      }}
                    >
                      ☎ {item[3]} — Call
                    </a>
                  )}

                  <div style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    overflowWrap: "anywhere"
                  }}>
                    {item[2]}
                  </div>

                  <a
                    href={item[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    Open Official Portal ↗
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}

        <footer style={{
          background: "#102a56",
          color: "#fff",
          padding: 20,
          borderRadius: 16,
          marginTop: 25,
          lineHeight: 1.65
        }}>
          <h3 style={{ marginTop: 0 }}>
            Important Information & Safety Disclaimer
          </h3>

          <ul style={{ paddingLeft: 20, fontSize: 13 }}>
            <li>
              This is an independent directory of government information
              portals. It is not a government website or official government
              application.
            </li>
            <li>
              Government departments may change website addresses, scheme
              rules, application processes and helpline numbers. Verify current
              details on the linked official portal.
            </li>
            <li>
              Scheme eligibility, documents, deadlines and benefits depend on
              the latest government notification and individual circumstances.
            </li>
            <li>
              For legal matters, read the current Act, amendments, rules and
              court orders. This directory is not legal advice.
            </li>
            <li>
              For immediate danger, call 112. Clicking a link does not
              automatically send an emergency request.
            </li>
            <li>
              Never share OTP, PIN, passwords, full bank details or Aadhaar
              authentication codes with unknown callers or websites.
            </li>
            <li>
              Some services require visiting a CSC, Gram Panchayat, Mamlatdar,
              Taluka office, Municipality, Police Station, bank or relevant
              department.
            </li>
            <li>
              Helpline numbers and service availability can vary by state,
              district and department. Confirm the current number through
              the official portal.
            </li>
          </ul>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,.25)",
            paddingTop: 12,
            fontSize: 12,
            opacity: 0.8
          }}>
            Government Super Portal • Central Government + Gujarat Government
            • Citizen Services • Public Information
          </div>
        </footer>
      </div>
    </div>
  );
}
