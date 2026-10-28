import React, { useState } from 'react';
import {
  Container, Box, Typography, Paper, Accordion, AccordionSummary,
  AccordionDetails, Divider, Chip
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

const faqs = [
  {
    q: 'How does the Section 80G tax deduction work?',
    a: 'Under Section 80G of the Indian Income Tax Act 1961, Indian taxpayers can claim a 50% deduction on eligible donations made to registered charitable trusts like Helping India Foundation. For instance, if you donate ₹10,000, you can deduct ₹5,000 from your taxable gross total income.',
  },
  {
    q: 'Why do you request my PAN number during donation?',
    a: 'As per Central Board of Direct Taxes (CBDT) rules, non-profits in India must file Form 10BD annually, reporting the PAN of all donors claiming 80G tax deductions. This allows the Income Tax Department to pre-fill your donation credit into your Annual Information Statement (AIS) and Form 26AS.',
  },
  {
    q: 'How do I donate using UPI (Google Pay, PhonePe, Paytm, BHIM)?',
    a: 'You can transfer directly to our primary verified UPI ID: tarun-tiwari@ptyes, or scan the official QR code displayed in the donation modal. After paying, simply enter the 6 to 12 digit UTR / transaction reference into our portal to receive your instantaneous 80G certificate.',
  },
  {
    q: 'Can foreign citizens or Non-Resident Indians (NRIs) donate?',
    a: 'NRIs holding an active Indian domestic bank account (NRO/NRE) or Indian Rupee payment card can donate. Under the Foreign Contribution (Regulation) Act (FCRA), we cannot accept foreign currency cards or international wire transfers without specific prior FCRA registration.',
  },
  {
    q: 'What percentage of my donation goes directly toward programs?',
    a: 'At least 84% of every donated rupee directly funds school kits, mobile doctor visits, daily food rations, and saplings. Administrative and audit expenses are strictly capped at under 16%, verified by independent Chartered Accountants.',
  },
  {
    q: 'Can I retrieve my donation receipt later if I lose it?',
    a: 'Yes! Visit our "Find 80G Receipt" page anytime, enter your donor email address, and instantly view or reprint all your past official receipts.',
  },
];

export default function DonationFaq() {
  const [expanded, setExpanded] = useState(0);

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 750, mb: 5 }}>
          <Chip icon={<HelpOutlineRoundedIcon sx={{ fontSize: 16 }} />} label="Everything You Need to Know" sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, mb: 1.5 }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 1.5 }}>
            Donation & Tax FAQs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Clear answers on tax deductions, payment methods, receipts, and fund allocations.
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #DCE6E1' }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={(e, isExp) => setExpanded(isExp ? index : false)}
              disableGutters
              elevation={0}
              sx={{
                borderBottom: index < faqs.length - 1 ? '1px solid #EBF1ED' : 'none',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" fontWeight={800} color="#172B3A">
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 3, pt: 0 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
