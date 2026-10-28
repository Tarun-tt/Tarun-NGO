// Fallback data ensuring frontend renders beautifully even when backend is offline or during static preview

export const fallbackCampaigns = [
  {
    id: 'cmp_edu_01',
    slug: 'shiksha-setu-education-for-underserved-children',
    title: 'Shiksha Setu: Education for Underserved Children',
    category: 'Education',
    description: 'Provide quality school learning kits, digital smart classes, and after-school remedial tutoring for children across rural and semi-urban schools.',
    story: 'Across India, underprivileged children drop out or struggle because of a lack of basic study materials, uniforms, and focused academic mentoring. The Shiksha Setu initiative bridges this educational gap by establishing active learning centers, supplying study kits, and mentoring local students.',
    target_amount: 120000,
    raised_amount: 82500,
    donor_count: 38,
    image_url: './images/education.jpg',
    status: 'active',
    featured: 1,
    recentDonors: [
      { name: 'Dr. Anita Desai', amount: 2500, created_at: new Date().toISOString(), notes: 'For children education kits' },
      { name: 'Vikram Sengupta', amount: 1500, created_at: new Date().toISOString() },
      { name: 'Kind Supporter', amount: 500, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'cmp_health_02',
    slug: 'arogya-vandana-mobile-rural-health-clinics',
    title: 'Arogya Vandana: Mobile Rural Health Clinics',
    category: 'Healthcare',
    description: 'Deploy equipped mobile medical units providing free preventive diagnostic checkups, maternal healthcare, and essential medicines to remote villages.',
    story: 'For remote families, reaching the nearest clinic means losing a day of daily wage work. Our mobile medical visits arrive at village doorsteps with volunteer MBBS doctors, basic diagnostic tools, and essential free medicines.',
    target_amount: 95000,
    raised_amount: 64000,
    donor_count: 29,
    image_url: './images/healthcare.jpg',
    status: 'active',
    featured: 1,
    recentDonors: [
      { name: 'Rajesh Mehra', amount: 2000, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'cmp_hunger_03',
    slug: 'annapoorna-daily-nutrition-for-vulnerable-communities',
    title: 'Annapoorna: Daily Nutrition for Vulnerable Communities',
    category: 'Hunger Relief',
    description: 'Nutritious hot meals, ration packs, and dietary supplements distributed to vulnerable daily-wage families, elderly citizens, and shelter homes.',
    story: 'Nutrition is the bedrock of dignity, learning, and physical immunity. The Annapoorna project operates hygienic community kitchens that serve freshly cooked, balanced meals to elderly persons, street dwellers, and migrant worker families.',
    target_amount: 80000,
    raised_amount: 54000,
    donor_count: 24,
    image_url: './images/hunger-relief.jpg',
    status: 'active',
    featured: 1,
    recentDonors: []
  },
  {
    id: 'cmp_women_04',
    slug: 'swavalamban-vocational-skilling-for-women',
    title: 'Swavalamban: Vocational Skilling for Women Artisans',
    category: 'Women Empowerment',
    description: 'Empower women through certified tailoring, handloom weaving, financial literacy workshops, and direct market access for their handmade crafts.',
    story: 'When an Indian mother earns an independent income, 90% of her earnings go directly towards her children nutrition and schooling. Swavalamban sets up community skilling centers that teach tailoring, handicraft production, and basic digital banking.',
    target_amount: 75000,
    raised_amount: 49000,
    donor_count: 22,
    image_url: './images/women-empowerment.jpg',
    status: 'active',
    featured: 1,
    recentDonors: []
  },
  {
    id: 'cmp_env_05',
    slug: 'vriksha-rakshak-community-tree-planting-and-water-conservation',
    title: 'Vriksha Rakshak: Community Tree Planting & Water Conservation',
    category: 'Environment',
    description: 'Afforestation with native species, rainwater harvesting pits, and environmental awareness drives to protect local groundwater tables.',
    story: 'Extreme heatwaves and depleting groundwater reservoirs require urgent community-level climate action. Vriksha Rakshak mobilizes village youths and volunteers to plant drought-resistant native trees like Neem, Peepal, and Banyan.',
    target_amount: 60000,
    raised_amount: 38000,
    donor_count: 18,
    image_url: './images/environment.jpg',
    status: 'active',
    featured: 1,
    recentDonors: []
  },
  {
    id: 'cmp_child_06',
    slug: 'suraksha-child-welfare-and-protective-care',
    title: 'Suraksha: Nutritious Mid-day Care & Child Protection',
    category: 'Child Welfare',
    description: 'Safe day-care, nutritional monitoring, health screenings, and protective mentorship for children of migrant and construction workers.',
    story: 'Children at construction sites and migrant settlements often remain unattended during work hours. Suraksha daycare centers provide a safe environment with joyful early education, nutritious food, clean drinking water, and pediatric checkups.',
    target_amount: 65000,
    raised_amount: 44000,
    donor_count: 21,
    image_url: './images/child-welfare.jpg',
    status: 'active',
    featured: 1,
    recentDonors: []
  }
];

export const fallbackStories = [
  {
    id: 'sty_01',
    title: 'How 11-Year-Old Aarav Returned to School with Top Honors',
    category: 'Education',
    summary: 'After his family lost their daily livelihood, Aarav faced dropping out of class 6. The Shiksha Setu kit and evening tutoring brought him back.',
    content: 'Aarav is the eldest of three siblings from a family residing in an informal settlement near Jaipur. When financial distress hit his household, Aarav began helping at a local tea stall. Helping India field volunteers identified Aarav during our doorstep education survey and enrolled him in our evening study center. Today, Aarav has scored 92% in his annual examinations and dreams of becoming an engineer.',
    beneficiary_name: 'Aarav (Name changed for minor privacy)',
    location: 'Jaipur, Rajasthan',
    image_url: './images/story-aarav.jpg',
    quote: 'I used to think my studies were over. Now every evening I get to read books and solve science puzzles.',
    date: 'October 2025'
  },
  {
    id: 'sty_02',
    title: 'Sunita Devi: From Daily Wage Worker to Micro-Entrepreneur',
    category: 'Women Empowerment',
    summary: 'Through our Swavalamban vocational center, Sunita learned professional stitching and now runs her own tailoring unit employing four women.',
    content: 'Sunita Devi from rural Uttar Pradesh earned sporadic daily wages of under ₹150. Joining Helping India 6-month tailoring and embroidery fellowship gave her hands-on master training, a sewing machine grant, and basic financial literacy. She now creates school uniforms and festive wear, earning upwards of ₹14,000 monthly.',
    beneficiary_name: 'Sunita Devi',
    location: 'Varanasi, Uttar Pradesh',
    image_url: './images/story-sunita.jpg',
    quote: 'Financial independence gave me my self-respect back. I can now fund both my daughters higher secondary schooling without taking loans.',
    date: 'January 2026'
  },
  {
    id: 'sty_03',
    title: 'Reviving a Dry Village: Community Tree Planting and Well Recharge',
    category: 'Environment',
    summary: 'Community youth teamed up with Vriksha Rakshak to plant 350 native shade saplings and dig rainwater recharge pits, replenishing the local water table.',
    content: 'In drought-prone Bundelkhand, farming families struggled with depleted borewells. Over two planting seasons, 28 community volunteers planted native Neem and Shisham trees and constructed 4 decentralized rainwater recharge pits. Groundwater monitoring confirmed a steady rise in water levels across two surrounding village wells.',
    beneficiary_name: 'Gram Panchayat & Village Community',
    location: 'Bundelkhand, Madhya Pradesh',
    image_url: './images/environment.jpg',
    quote: 'Our village well used to dry up by February. This year our community trees provided shade and our well held water throughout summer.',
    date: 'December 2025'
  },
  {
    id: 'sty_04',
    title: 'Midnight Flood Emergency in Bihar: Relief for 85 Stranded Families',
    category: 'Emergency Relief',
    summary: 'When the river embankment breached at 2 AM, 85 daily-wage families lost their huts. Helping India arrived within hours with emergency dry rations and clean water.',
    content: 'In August 2025, sudden monsoon floods inundated village hamlets in Madhubani district. Families stood stranded on muddy embankment bunds without clean drinking water. Helping India emergency response volunteers deployed relief rafts, distributed 85 comprehensive dry survival packs (chura, gur, halogen water purification tablets), and operated an Annapoorna community khichdi kitchen for 8 straight days.',
    beneficiary_name: 'Ramvati Devi & 85 Flood Survivors',
    location: 'Madhubani, Bihar',
    image_url: './images/incident-flood-relief.jpg',
    quote: 'When our thatched home washed away in the dark, we thought no one would come. Helping India volunteers gave my shivering grandchildren hot food and fresh water.',
    date: 'August 2025'
  },
  {
    id: 'sty_05',
    title: 'Rescued from Brick-Kiln Child Labor: 7-Year-Old Priya’s New Life',
    category: 'Child Welfare & Education',
    summary: 'Destined to carry heavy brick trays under burning sun to clear inherited debt, Priya was rescued, enrolled in remedial classes, and is now standard grade top student.',
    content: 'Priya spent her days carrying unbaked mud bricks under the summer heat to help her migrant parents pay off debt. During our doorstep educational drive, Helping India coordinators intervened, compensated the family through nutritional stipends, and admitted Priya into our bridge school. She received a brand new uniform, books, and daily nutritious meals. Within 8 months, Priya learned fluent Hindi and basic mathematics, passing her formal school entry test with distinction.',
    beneficiary_name: 'Priya (7 Years Old)',
    location: 'Sitapur, Uttar Pradesh',
    image_url: './images/incident-priya-education.jpg',
    quote: 'I used to get blisters on my hands carrying bricks. Now my hands hold pencils and storybooks. When I grow up, I will become a teacher to educate poor children.',
    date: 'September 2025'
  },
  {
    id: 'sty_06',
    title: 'Light Restored After 5 Years: 68-Year-Old Ramu Kaka’s Sight Miracle',
    category: 'Healthcare',
    summary: 'Blinded by mature cataracts and unable to afford a ₹12,000 city surgery, Ramu Kaka lived in darkness until Arogya Vandana mobile camp gave him free sight surgery.',
    content: 'For five years, 68-year-old landless farmer Ramu Kaka sat in the shadows of his clay veranda, completely blinded by bilateral hyper-mature cataracts. When Helping India Arogya Vandana mobile diagnostic van arrived at his village, our medical officer diagnosed him, arranged free ambulance transit to our partner eye hospital, and sponsored his intraocular lens implant surgery. 48 hours later, when bandages were removed, Ramu Kaka saw his 4-year-old grandson for the very first time.',
    beneficiary_name: 'Ramu Kaka (68 Years Old)',
    location: 'Alwar, Rajasthan',
    image_url: './images/incident-elderly-healthcare.jpg',
    quote: 'I lived in darkness for five long years. Today I held my little grandson and saw his face. May God bless every donor who gave me my eyes back.',
    date: 'November 2025'
  },
  {
    id: 'sty_07',
    title: 'Midnight Operation Warmth: Saving 280 Pavement Dwellers from Freezing Frost',
    category: 'Hunger & Shelter',
    summary: 'When winter temperatures dropped to 3°C, our midnight volunteer teams covered 280 homeless individuals and newborns with heavy 4-ply thermal blankets.',
    content: 'Winter nights in North India turn deadly for those sleeping on footpaths, beneath flyovers, and near railway stations. In December 2025, during a severe cold wave, Helping India launched Operation Warmth. Every night between 11 PM and 2 AM, our volunteer squads distributed 280 thick woolen blankets, warm beanies, thermal socks, and steaming mugs of immunity kadha and hot vegetable soup, directly preventing fatal hypothermia.',
    beneficiary_name: 'Homeless Families & Daily Wage Laborers',
    location: 'Yamuna Pushta & Old Delhi',
    image_url: './images/incident-winter-drive.jpg',
    quote: 'This warm blanket saved my 6-month-old daughter from pneumonia. We would not have survived the bitter night without Helping India.',
    date: 'December 2025'
  },
  {
    id: 'sty_08',
    title: 'From ₹50 Daily Wage to Dignity: Varanasi Women Artisan Cooperative',
    category: 'Women Empowerment',
    summary: '14 village women broke generational poverty by mastering commercial stitching, earning steady independent income and ending loan shark exploitation.',
    content: 'In rural Varanasi, women had no independent income and survived at the mercy of village money lenders charging steep monthly interest. Helping India Swavalamban center brought 14 women together, provided sewing machines, professional cutting masters, and direct orders for cotton shopping bags and school uniforms. In their very first quarter, the cooperative produced 850 items, netting each woman a steady monthly income of ₹9,500 directly in their own bank accounts.',
    beneficiary_name: 'Radha Devi & 14 Women Artisans',
    location: 'Varanasi, Uttar Pradesh',
    image_url: './images/incident-women-coop.jpg',
    quote: 'For the first time in our lives, we have our own bank passbooks. We no longer ask anyone for permission to feed or educate our daughters.',
    date: 'February 2026'
  },
  {
    id: 'sty_09',
    title: 'Emergency Financial Assistance: Overcoming Sudden Medical Hardship',
    category: 'Emergency Financial Assistance',
    summary: 'When auto-driver Rajesh met with a debilitating road accident, emergency micro-grant assistance covered his family rent, grocery rations, and children school fees.',
    content: 'Rajesh Kumar, a sole breadwinner supporting a family of five, suffered multiple fractures in an accident. With zero daily earnings, the family faced immediate eviction and hunger. Helping India Emergency Relief Fund intervened within 24 hours, approving an emergency financial assistance grant of ₹15,000 that settled two months of room rent and funded critical orthopedic medicines, while our volunteer wing delivered monthly dry groceries.',
    beneficiary_name: 'Rajesh & Sunita Kumar',
    location: 'Kanpur, Uttar Pradesh',
    image_url: './images/tier-ration.jpg',
    quote: 'When an accident broke my legs, I thought my children would starve. Helping India stood by us like family, paying our room rent and putting food on our table.',
    date: 'March 2026'
  },
  {
    id: 'sty_10',
    title: 'Disability Support: Wheels of Dignity for 12-Year-Old Vikas',
    category: 'Disability Support',
    summary: 'Providing custom pediatric wheelchairs, crutches, and inclusive home study desks for children with physical and locomotor challenges.',
    content: '12-year-old Vikas was born with cerebral palsy in a semi-rural hamlet. Unable to walk, he had spent years confined inside his clay room while neighborhood children attended school. Helping India Disability Inclusion initiative assessed Vikas, procured a custom-fitted pediatric wheelchair with ergonomic trunk supports, and coordinated with the local school headmaster to construct an entry ramp. Vikas now rolls into class independently every morning.',
    beneficiary_name: 'Vikas Sharma (12 Years Old)',
    location: 'Jaipur, Rajasthan',
    image_url: './images/child-welfare.jpg',
    quote: 'I used to watch other children walk to school through my window. Today I ride my own wheelchair into the classroom and sit in the front row.',
    date: 'January 2026'
  },
  {
    id: 'sty_11',
    title: 'Menstrual Health Awareness: Ending School Absenteeism with Dignity Kits',
    category: 'Menstrual Health Awareness',
    summary: 'Empowering 160 rural adolescent girls with stigma-free hygiene education, private sanitation facilities, and 6-month biodegradable menstrual care kits.',
    content: 'In government schools across Sitapur district, 4 out of 10 teenage girls regularly missed exams or dropped out due to lack of sanitary pads and menstrual stigma. Helping India Project Dignity conducted respectful doctor-led menstrual hygiene workshops across 3 schools, breaking myths and providing 160 girls with comprehensive hygiene kits containing biodegradable pads, mild antiseptic soap, and disposal pouches.',
    beneficiary_name: 'Komal & 160 Student Peers',
    location: 'Sitapur, Uttar Pradesh',
    image_url: './images/women-empowerment.jpg',
    quote: 'We were taught that periods are dirty and we should stay hidden. The female doctors from Helping India taught us it is natural biology and gave us clean supplies.',
    date: 'November 2025'
  },
  {
    id: 'sty_12',
    title: 'Disaster Rehabilitation: Helping 38 Families Rebuild Safe Homesteads',
    category: 'Disaster Rehabilitation',
    summary: 'Providing durable corrugated roofing sheets, structural timber, and mason support to help flood-ravaged daily wage earners permanently reconstruct their homes.',
    content: 'After flash floods washed away mud dwellings in riverbank hamlets, emergency relief gave temporary food, but families faced months of exposure to rain and cold. Helping India initiated Phase-2 Disaster Rehabilitation, procuring heavy-gauge GI roofing sheets, cement bags, and construction materials for 38 most vulnerable families, restoring permanent, elevated, weatherproof roofs over their heads.',
    beneficiary_name: 'Mangal Manjhi & 38 Village Families',
    location: 'Katihar, Bihar',
    image_url: './images/incident-flood-relief.jpg',
    quote: 'The flood took our thatch roof, but Helping India gave us permanent corrugated metal roofing. This monsoon our babies slept dry and safe.',
    date: 'October 2025'
  },
  {
    id: 'sty_13',
    title: 'Rural Development: Solar Community Study Kiosk in Khajuri Hamlet',
    category: 'Rural Development',
    summary: 'Establishing a solar-powered study hall with evening lighting, clean RO drinking water, and quiet desk spaces for first-generation learners.',
    content: 'Khajuri hamlet suffered from 10-hour daily power cuts, leaving school-going children to study under smoky kerosene lamps. Under our Gram Pragati program, Helping India installed a 2.5 kW rooftop solar panel system with battery backup on a shared community hall, installed 12 study desks, LED reading tubes, and a community RO water filter. 45 students now study together comfortably every single evening.',
    beneficiary_name: 'Khajuri Village Gram Youth',
    location: 'Banda, Uttar Pradesh',
    image_url: './images/environment.jpg',
    quote: 'Kerosene smoke used to sting our eyes while doing homework. Now our village study hall has bright solar lights and clean water every evening.',
    date: 'December 2025'
  },
  {
    id: 'sty_14',
    title: 'Mental Health Awareness: Community Listening Circles and Professional Care',
    category: 'Mental Health Awareness',
    summary: 'Creating stigma-free emotional support circles for youth, caregivers, and exam students with subsidized referrals to qualified clinical counselors.',
    content: 'Severe financial distress, exam stress, and societal isolation frequently push young individuals into untreated depression and anxiety. Helping India launched weekly "Mann Ki Baat" peer listening circles led by trained empathetic volunteers, while partnering with certified psychologists in Delhi to sponsor 35 subsidized one-on-one professional therapy sessions for individuals facing severe emotional distress.',
    beneficiary_name: 'Pooja (Student) & Youth Peer Group',
    location: 'East Delhi & Noida',
    image_url: './images/healthcare.jpg',
    quote: 'I felt completely overwhelmed and had nowhere to turn without judgment. Helping India counselor listened with kindness and helped me rebuild my mental strength.',
    date: 'January 2026'
  },
  {
    id: 'sty_15',
    title: 'Blood Donation Awareness: Voluntary Drives for Thalassemia Children',
    category: 'Blood Donation Awareness',
    summary: 'Organizing community voluntary blood camps with licensed government blood banks, collecting screened life-saving blood for pediatric patients.',
    content: 'Children with Thalassemia Major require bi-weekly packed red blood cell transfusions to survive, yet blood banks constantly battle dangerous supply shortages. Helping India organized 3 voluntary community blood donation camps in coordination with licensed blood transfusion centers, collecting 92 units of voluntary blood from youth donors and dispelling common myths regarding donor weakness.',
    beneficiary_name: 'Aarush (Age 6, Thalassemia Warrior) & Donors',
    location: 'Noida, Uttar Pradesh',
    image_url: './images/volunteer-action.jpg',
    quote: 'My 6-year-old son needs two blood transfusions every month. The donors brought together by Helping India keep my child alive and smiling.',
    date: 'February 2026'
  },
  {
    id: 'sty_16',
    title: 'Migrant Worker Support: Ration, Healthcare & Document Enrollment',
    category: 'Migrant Worker Support',
    summary: 'Supporting interstate construction laborers with doorstep medical checkups, emergency dry food rations, and e-Shram worker welfare registrations.',
    content: 'Interstate migrant laborers at suburban construction clusters frequently live without ration cards, clean sanitation, or local identity proof. Helping India set up mobile Sahayata Desks, assisting 120 worker families with e-Shram cards and Ayushman Bharat health registrations, while supplying 75 families with emergency whole-grain grocery baskets during lean monsoon work closures.',
    beneficiary_name: 'Mohan Lal & Migrant Construction Laborers',
    location: 'Gurugram, Haryana',
    image_url: './images/tier-ration.jpg',
    quote: 'Being hundreds of miles from our home village, no one helped us when work halted. Helping India gave us food rations and helped us enroll in government health cards.',
    date: 'November 2025'
  },
  {
    id: 'sty_17',
    title: 'Old-Age Support: Dignity Rations and Chronic Care for Abandoned Elders',
    category: 'Old-Age Support',
    summary: 'Delivering monthly nutrition baskets, warm woolen clothing, and essential blood pressure and diabetes medicines to destitute senior citizens.',
    content: 'In suburban alleys and neglected hamlets, elderly citizens with no surviving family often struggle to afford basic dal, rice, or daily hypertension tablets. Helping India Sanjhi Chhat program adopted 28 destitute grandmothers and grandfathers, delivering monthly food baskets, fresh fruits, and doctor-prescribed chronic illness medications straight to their doorways with genuine respect.',
    beneficiary_name: 'Shanti Dadi (76 Years Old)',
    location: 'Varanasi, Uttar Pradesh',
    image_url: './images/incident-elderly-healthcare.jpg',
    quote: 'At my age, when everyone forgot about me, these young volunteers visit me every month with my medicines and rations. They treat me like their own grandmother.',
    date: 'December 2025'
  },
  {
    id: 'sty_18',
    title: 'Road Safety: Distributing ISI Helmets & Defensive Driving Workshops',
    category: 'Road Safety',
    summary: 'Educating delivery riders and school commuters on defensive road discipline while providing certified protective safety helmets to gig workers.',
    content: 'Road accidents claim thousands of young Indian lives annually, with non-helmet use contributing to over 70% of two-wheeler head injuries. Helping India Surakshit Safar initiative organized interactive traffic safety workshops in partnership with local traffic police, distributing 80 ISI-marked protective helmets to gig delivery workers and conducting zebra-crossing awareness sessions for 140 school students.',
    beneficiary_name: 'Deepak (Delivery Partner) & Commuters',
    location: 'Lucknow, Uttar Pradesh',
    image_url: './images/education.jpg',
    quote: 'As a delivery boy riding 80 kilometers daily, buying a quality helmet was out of my budget. Helping India gave me a sturdy certified helmet that keeps me safe for my family.',
    date: 'February 2026'
  }
];

export const pastFiveYearsIncidents = [
  {
    id: 'relief_2021_covid',
    year: '2021',
    missionName: 'Mission Prana Vayu & Annapoorna Express',
    incidentTitle: 'COVID-19 Second Wave Emergency Relief & Migrant Food Security',
    location: 'Delhi-NCR & Lucknow',
    category: 'Healthcare & Hunger Relief',
    crisis: 'In April–May 2021, severe medical oxygen shortages and sudden lockdowns left vulnerable daily-wage workers and elderly citizens stranded with neither hospital access nor food.',
    helpingIndiaAction: 'Helping India established 2 decentralized emergency oxygen concentrator points providing free refill support for elderly home patients, while our volunteer relief kitchen provided 850 freshly prepared hot meals and 180 dry ration packs to stranded migrant families.',
    livesImpacted: '180 Families Supported · 2 Emergency O₂ Points',
    image: './images/healthcare.jpg',
    quote: 'When hospitals were overwhelmed, Helping India volunteers delivered essential medicines and food rations to our door.',
    quoteAuthor: 'Suraj Bhan, Daily Wage Worker, Delhi',
    suggestedSponsorAmount: 1000
  },
  {
    id: 'relief_2022_assam',
    year: '2022',
    missionName: 'Mission Jal Tarang: North-East Flood Action',
    incidentTitle: 'The Great Assam & Barak Valley Mega Floods',
    location: 'Silchar & Cachar District',
    category: 'Disaster Emergency Relief',
    crisis: 'Severe monsoon floods submerged village settlements under water, cutting off daily-wage families without dry food, shelter, or safe drinking water.',
    helpingIndiaAction: 'Helping India mobilized local rescue boats, distributed 140 dry survival packs (chura, gur, halogen water purification tablets), and conducted 3 floating medical checkups treating 320 villagers for waterborne infections.',
    livesImpacted: '140 Families Rescued · 320 Treated',
    image: './images/incident-flood-relief.jpg',
    quote: 'Our tin roof was surrounded by water for days. The Helping India relief boat reached us with drinking water and baby milk.',
    quoteAuthor: 'Anima Boro, Silchar Rural District',
    suggestedSponsorAmount: 2500
  },
  {
    id: 'relief_2023_joshimath',
    year: '2023',
    missionName: 'Operation Himalaya Rakshak',
    incidentTitle: 'Joshimath Land Subsidence & Winter Freezing Crisis',
    location: 'Joshimath & Chamoli, Uttarakhand',
    category: 'Winter Survival & Rehabilitation',
    crisis: 'Severe geological ground fissures damaged mountain homes in January 2023. In sub-zero temperatures (-4°C), displaced families faced biting frost with inadequate winter gear.',
    helpingIndiaAction: 'Helping India set up a warm transit shelter room, distributed 85 heavy 4-ply thermal sleeping bags and insulated winter jackets, and provided daily hot nutritious soup and pediatric medicines to displaced families.',
    livesImpacted: '85 Evacuees Sheltered from Frost',
    image: './images/incident-winter-drive.jpg',
    quote: 'The ground split beneath our feet in the dead of winter. Helping India kept our elderly parents and babies warm in heated relief shelters.',
    quoteAuthor: 'Maheshwari Devi, Joshimath',
    suggestedSponsorAmount: 1000
  },
  {
    id: 'relief_2023_biparjoy',
    year: '2023',
    missionName: 'Mission Kutch Suraksha',
    incidentTitle: 'Cyclone Biparjoy Coastal Destruction Relief',
    location: 'Mandvi & Coastal Kutch, Gujarat',
    category: 'Cyclone Relief & Shelter Reconstruction',
    crisis: 'Extremely Severe Cyclonic Storm Biparjoy damaged thatch dwellings of salt-pan workers and fishing hamlets, tearing down roofs and cutting off power.',
    helpingIndiaAction: 'Helping India distributed 65 heavy-duty weatherproof tarpaulin shelter kits, solar-powered LED emergency lamps, and 1-month family grocery packs to rebuild basic homestead security.',
    livesImpacted: '65 Coastal Families Re-sheltered',
    image: './images/environment.jpg',
    quote: 'Our thatch roof blew away in the cyclone. Helping India gave us waterproof tarpaulins, solar lights, and food for an entire month.',
    quoteAuthor: 'Govind Bhai, Salt-pan Artisan, Kutch',
    suggestedSponsorAmount: 2500
  },
  {
    id: 'relief_2024_heatwave',
    year: '2024',
    missionName: 'Mission Jal Jeevan & Amrit Dhara',
    incidentTitle: 'Record 50.5°C Extreme Heatwave & Water Scarcity',
    location: 'Delhi-NCR & Bundelkhand',
    category: 'Climate & Heatwave Emergency',
    crisis: 'Intense summer temperatures crossing 48°C placed roadside vendors and daily wage laborers at critical risk of heatstroke and dehydration.',
    helpingIndiaAction: 'Helping India set up 3 community "Jal Sewa" chilled drinking water points, distributed 450 ORS hydration packs to local rickshaw pullers and daily laborers, and assisted in repairing 4 village handpumps.',
    livesImpacted: '450 Outdoor Workers Hydrated · 4 Handpumps Restored',
    image: './images/tier-ration.jpg',
    quote: 'At 48 degrees on the road, pulling a cycle-rickshaw without water was dangerous. Helping India free cold water kiosks kept us going.',
    quoteAuthor: 'Rameshwar Yadav, Rickshaw Puller, Delhi',
    suggestedSponsorAmount: 500
  },
  {
    id: 'relief_2024_wayanad',
    year: '2024',
    missionName: 'Mission Kerala Karuna',
    incidentTitle: 'Wayanad Midnight Landslide Disaster Response',
    location: 'Chooralmala & Meppadi, Wayanad',
    category: 'Disaster Rehabilitation & Child Adoption',
    crisis: 'Midnight landslides washed away plantation worker settlements, displacing families and leaving young children without family support.',
    helpingIndiaAction: 'Helping India provided emergency trauma medical kits, supplied study materials for 45 displaced students, and officially adopted 12 orphaned children with continuing educational fellowships.',
    livesImpacted: '12 Orphaned Children Adopted · 85 Camp Inmates Supported',
    image: './images/incident-priya-education.jpg',
    quote: 'I lost my parents and my school books in the mud. Helping India promised to stand beside me until I finish school.',
    quoteAuthor: 'Anand (Age 10), Wayanad Survivor',
    suggestedSponsorAmount: 2500
  },
  {
    id: 'relief_2025_2026_shiksha',
    year: '2025–2026',
    missionName: 'National Shiksha & Swavalamban Expansion',
    incidentTitle: 'Doorstep Child Labor Rescue & Women Cooperative Movement',
    location: 'Uttar Pradesh, Bihar & Rajasthan',
    category: 'Child Rescue, Education & Women Skilling',
    crisis: 'Economic hardship forced children into informal work (brick kilns, roadside stalls) while rural mothers struggled without independent incomes.',
    helpingIndiaAction: 'Helping India rescued 65 children from informal labor into remedial bridge centers with complete school kits and daily meals, while establishing 2 self-governed women tailoring cooperatives providing 14 artisan mothers steady independent incomes.',
    livesImpacted: '65 Children Rescued · 14 Cooperatives Established',
    image: './images/women-empowerment.jpg',
    quote: 'My daughter no longer carries bricks under the hot sun. She wears a clean school uniform and writes poetry.',
    quoteAuthor: 'Sunita Devi, Empowered Artisan Mother',
    suggestedSponsorAmount: 500
  }
];

export const fallbackGallery = [
  {
    id: 'gal_01',
    title: 'Community Learning Camp in Rural Uttar Pradesh',
    category: 'Education',
    image_url: './images/education.jpg',
    description: 'Volunteer educators teaching interactive arithmetic and reading sessions under the open banyan tree.',
    caption: 'Joyful learning beyond four walls'
  },
  {
    id: 'gal_02',
    title: 'Mobile Health Clinic Consultation',
    category: 'Healthcare',
    image_url: './images/healthcare.jpg',
    description: 'Doctor examining an elderly patient during our bi-weekly rural healthcare camp.',
    caption: 'Free medical diagnosis and medicine distribution'
  },
  {
    id: 'gal_03',
    title: 'Annapoorna Hot Meal Distribution Drive',
    category: 'Hunger Relief',
    image_url: './images/hunger-relief.jpg',
    description: 'Freshly cooked wholesome meals served with care to migrant workers and children.',
    caption: 'Nutrition, dignity, and zero food waste'
  },
  {
    id: 'gal_04',
    title: 'Women Tailoring & Skill Training Workshop',
    category: 'Women Empowerment',
    image_url: './images/women-empowerment.jpg',
    description: 'Hands-on practical training with commercial sewing machines at our vocational center.',
    caption: 'Fostering self-reliance and entrepreneurship'
  },
  {
    id: 'gal_05',
    title: 'Community Monsoon Tree Plantation',
    category: 'Environment',
    image_url: './images/environment.jpg',
    description: 'Volunteers and school students planting native saplings along river banks.',
    caption: '50,000 native trees for climate resilience'
  },
  {
    id: 'gal_06',
    title: 'Children Day Creative Expression Day',
    category: 'Child Welfare',
    image_url: './images/child-welfare.jpg',
    description: 'Painting, dance, and cultural celebration for shelter home kids.',
    caption: 'Every child deserves safe spaces to express themselves'
  }
];
