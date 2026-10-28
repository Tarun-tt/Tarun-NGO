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
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85',
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
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=85',
    quote: 'Our village wells used to dry up by February. This year our fields remained green throughout April.',
    date: 'December 2025'
  }
];

export const fallbackGallery = [
  {
    id: 'gal_01',
    title: 'Community Learning Camp in Rural Uttar Pradesh',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=85',
    description: 'Volunteer educators teaching interactive arithmetic and reading sessions under the open banyan tree.',
    caption: 'Joyful learning beyond four walls'
  },
  {
    id: 'gal_02',
    title: 'Mobile Health Clinic Consultation',
    category: 'Healthcare',
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=85',
    description: 'Doctor examining an elderly patient during our bi-weekly rural healthcare camp.',
    caption: 'Free medical diagnosis and medicine distribution'
  },
  {
    id: 'gal_03',
    title: 'Annapoorna Hot Meal Distribution Drive',
    category: 'Hunger Relief',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=85',
    description: 'Freshly cooked wholesome meals served with care to migrant workers and children.',
    caption: 'Nutrition, dignity, and zero food waste'
  },
  {
    id: 'gal_04',
    title: 'Women Tailoring & Skill Training Workshop',
    category: 'Women Empowerment',
    image_url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=85',
    description: 'Hands-on practical training with commercial sewing machines at our vocational center.',
    caption: 'Fostering self-reliance and entrepreneurship'
  },
  {
    id: 'gal_05',
    title: 'Community Monsoon Tree Plantation',
    category: 'Environment',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=85',
    description: 'Volunteers and school students planting native saplings along river banks.',
    caption: '50,000 native trees for climate resilience'
  },
  {
    id: 'gal_06',
    title: 'Children Day Creative Expression Day',
    category: 'Child Welfare',
    image_url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=85',
    description: 'Painting, dance, and cultural celebration for shelter home kids.',
    caption: 'Every child deserves safe spaces to express themselves'
  }
];
