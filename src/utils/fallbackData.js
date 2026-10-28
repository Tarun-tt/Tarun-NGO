// Fallback data ensuring frontend renders beautifully even when backend is offline or during static preview

export const fallbackCampaigns = [
  {
    id: 'cmp_edu_01',
    slug: 'shiksha-setu-education-for-underserved-children',
    title: 'Shiksha Setu: Education for Underserved Children',
    category: 'Education',
    description: 'Provide quality school learning kits, digital smart classes, and after-school remedial tutoring for children across rural and semi-urban schools.',
    story: 'Across India, millions of eager children drop out or struggle because of a lack of basic study materials, uniforms, and focused academic mentoring. The Shiksha Setu initiative bridges this educational gap by establishing active learning centers, supplying STEM kits, and training local teachers.',
    target_amount: 500000,
    raised_amount: 345000,
    donor_count: 142,
    image_url: './images/education.jpg',
    status: 'active',
    featured: 1,
    recentDonors: [
      { name: 'Dr. Anita Desai', amount: 5000, created_at: new Date().toISOString(), notes: 'For children education kits' },
      { name: 'Vikram Sengupta', amount: 2500, created_at: new Date().toISOString() },
      { name: 'Kind Supporter', amount: 1000, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'cmp_health_02',
    slug: 'arogya-vandana-mobile-rural-health-clinics',
    title: 'Arogya Vandana: Mobile Rural Health Clinics',
    category: 'Healthcare',
    description: 'Deploy equipped mobile medical units providing free preventive diagnostic checkups, maternal healthcare, and essential medicines to remote villages.',
    story: 'For thousands of remote families, reaching the nearest clinic means losing two days of daily wage work and traveling over 35 kilometers. Our mobile medical clinics arrive at their doorsteps weekly with verified MBBS doctors, pharmacists, and essential diagnostic devices.',
    target_amount: 450000,
    raised_amount: 285000,
    donor_count: 98,
    image_url: './images/healthcare.jpg',
    status: 'active',
    featured: 1,
    recentDonors: [
      { name: 'Rajesh Mehra', amount: 5000, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'cmp_hunger_03',
    slug: 'annapoorna-daily-nutrition-for-vulnerable-communities',
    title: 'Annapoorna: Daily Nutrition for Vulnerable Communities',
    category: 'Hunger Relief',
    description: 'Nutritious hot meals, ration packs, and dietary supplements distributed to vulnerable daily-wage families, elderly citizens, and shelter homes.',
    story: 'Nutrition is the bedrock of dignity, learning, and physical immunity. The Annapoorna project operates hygienic community kitchens that serve freshly cooked, balanced meals every single day to construction worker colonies, orphanages, and senior citizen shelters.',
    target_amount: 400000,
    raised_amount: 215000,
    donor_count: 85,
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
    target_amount: 350000,
    raised_amount: 195000,
    donor_count: 73,
    image_url: './images/women-empowerment.jpg',
    status: 'active',
    featured: 1,
    recentDonors: []
  },
  {
    id: 'cmp_env_05',
    slug: 'vriksha-rakshak-community-tree-planting-and-water-conservation',
    title: 'Vriksha Rakshak: 50,000 Native Trees Community Drive',
    category: 'Environment',
    description: 'Afforestation with native species, rainwater harvesting pits, and environmental awareness drives to protect local groundwater tables.',
    story: 'Extreme heatwaves and depleting groundwater reservoirs require urgent community-level climate action. Vriksha Rakshak mobilizes village youths and volunteers to plant drought-resistant native trees like Neem, Peepal, and Banyan, while reviving traditional water stepwells.',
    target_amount: 300000,
    raised_amount: 140000,
    donor_count: 64,
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
    target_amount: 300000,
    raised_amount: 165000,
    donor_count: 60,
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
    title: 'Reviving a Dry Village: 12,000 Saplings and Clean Water',
    category: 'Environment',
    summary: 'Community youth teamed up with Vriksha Rakshak to plant native trees and dig percolation ponds, raising the village water table by 1.8 meters.',
    content: 'In severe drought-prone Bundelkhand, farming families struggled with depleted borewells. Over two planting seasons, 140 community volunteers planted native Neem and Shisham trees and constructed 8 decentralized rainwater retention trenches. Groundwater monitoring confirmed an average rise of 1.8m in water levels across three surrounding village wells.',
    beneficiary_name: 'Gram Panchayat & Village Community',
    location: 'Bundelkhand, Madhya Pradesh',
    image_url: './images/environment.jpg',
    quote: 'Our village wells used to dry up by February. This year our fields remained green throughout April.',
    date: 'December 2025'
  },
  {
    id: 'sty_04',
    title: 'Midnight Flood Emergency in Bihar: Rescuing 1,200 Stranded Souls',
    category: 'Emergency Relief',
    summary: 'When the river embankment breached at 2 AM, 1,200 daily-wage families lost everything. Helping India arrived in 6 hours with lifeboats, clean water, and warm food.',
    content: 'In August 2025, sudden monsoon floods inundated 4 hamlets in Madhubani district. Families stood stranded on muddy railway tracks without food or clean drinking water for 18 hours. Helping India emergency response wing deployed 3 inflatable relief boats, distributed 1,200 dry ration packs (pressed rice, jaggery, milk powder, halogen tablets), and operated an Annapoorna mobile kitchen cooking 2,400 fresh khichdi meals twice daily for 12 straight days.',
    beneficiary_name: 'Ramvati Devi & 1,200 Flood Survivors',
    location: 'Madhubani, Bihar',
    image_url: './images/incident-flood-relief.jpg',
    quote: 'When our thatched home washed away in the dark, we thought no one would come. Helping India volunteers gave my shivering grandchildren hot food and fresh water.',
    date: 'August 2025'
  },
  {
    id: 'sty_05',
    title: 'Rescued from Brick-Kiln Child Labor: 7-Year-Old Priya’s New Life',
    category: 'Child Welfare & Education',
    summary: 'Destined to carry 15kg brick trays under burning sun to clear inherited debt, Priya was rescued, enrolled in remedial classes, and is now standard grade top student.',
    content: 'Priya spent her days carrying unbaked mud bricks under the blistering summer heat to help her migrant parents pay off debt. During our doorstep educational drive, Helping India coordinators intervened, compensated the family through nutritional stipends, and admitted Priya into our bridge school. She received a brand new uniform, books, and daily nutritious meals. Within 8 months, Priya learned fluent Hindi and basic mathematics, passing her formal school entry test with distinction.',
    beneficiary_name: 'Priya (7 Years Old)',
    location: 'Sitapur, Uttar Pradesh',
    image_url: './images/incident-priya-education.jpg',
    quote: 'I used to get blisters on my hands carrying bricks. Now my hands hold pencils and storybooks. When I grow up, I will become a doctor to treat poor children.',
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
    title: 'Midnight Operation Warmth: Saving 3,500 Pavement Dwellers from Freezing Frost',
    category: 'Hunger & Shelter',
    summary: 'When winter temperatures dropped to 3°C, our midnight volunteer teams covered 3,500 homeless individuals and newborns with heavy 4-ply thermal blankets.',
    content: 'Winter nights in North India turn deadly for those sleeping on footpaths, beneath flyovers, and near railway stations. In December 2025, during an unprecedented cold wave, Helping India launched Operation Warmth. Every night between 11 PM and 4 AM, our volunteer squads distributed 3,500 thick woolen blankets, warm beanies, thermal socks, and steaming mugs of immunity kadha and hot vegetable soup, directly preventing fatal hypothermia.',
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
    summary: '28 village women broke generational poverty by mastering commercial stitching, earning ₹16,500 monthly and ending loan shark exploitation.',
    content: 'In rural Varanasi, women had no independent income and survived at the mercy of village money lenders charging 10% monthly interest. Helping India Swavalamban center brought 28 women together, provided industrial grade sewing machines, professional cutting masters, and direct bulk orders for cotton shopping bags and uniforms. In their very first festive quarter, the cooperative produced 4,200 items, netting each woman an average monthly income of ₹16,500 directly in their own bank accounts.',
    beneficiary_name: 'Radha Devi & 28 Women Artisans',
    location: 'Varanasi, Uttar Pradesh',
    image_url: './images/incident-women-coop.jpg',
    quote: 'For the first time in our lives, we have our own bank passbooks. We no longer ask anyone for permission to feed or educate our daughters.',
    date: 'February 2026'
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
