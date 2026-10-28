import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { api } from "../api/client";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please provide your name, email, and message.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.sendContact(formData);
      setSuccess(
        res.message ||
          "Your message has been received! Our team will respond shortly.",
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 750, mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#087A52",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            CONNECT WITH US
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.4rem", md: "3.2rem" }, mt: 0.5, mb: 2 }}
          >
            We're Here to Help and Listen.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Whether you have questions about our campaigns, wish to partner as a
            CSR foundation, or require assistance with your donation tax
            certificate, our team is at your service.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Left Column: Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4.5 },
                borderRadius: 4,
                bgcolor: "#FAFDFB",
                border: "1.5px solid #D5E8DD",
              }}
            >
              <Typography variant="h5" fontWeight={800} color="#172B3A" mb={1}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Our administrative team responds within 24 to 48 working hours.
              </Typography>

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name *"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number (Optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Message *"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ py: 1.4, fontWeight: 800 }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Organization Details & Direct Bank / UPI Info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 3.5,
                  border: "1px solid #DCE6E1",
                  bgcolor: "#FFFFFF",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="#172B3A"
                  mb={2}
                >
                  Headquarters & Regional Offices
                </Typography>

                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <LocationOnRoundedIcon sx={{ color: "#087A52", mt: 0.3 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        color="#172B3A"
                      >
                        National Secretariat (NCR)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        A-42, Institutional Area, Sector 62, Noida, NCR -
                        201309, India
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <EmailRoundedIcon sx={{ color: "#087A52", mt: 0.3 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        color="#172B3A"
                      >
                        General Inquiries
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        contact@helpingindia.org
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <PhoneRoundedIcon sx={{ color: "#087A52", mt: 0.3 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        color="#172B3A"
                      >
                        Helpline & WhatsApp
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +91 99998 41038 (Mon-Sat, 9:30 AM - 6:30 PM IST)
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Direct UPI & NEFT Details */}
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 3.5,
                  border: "1.5px solid #087A52",
                  bgcolor: "#F7FCF9",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  mb={1.5}
                >
                  <QrCodeRoundedIcon sx={{ color: "#087A52", fontSize: 26 }} />
                  <Typography variant="h6" fontWeight={800} color="#087A52">
                    Direct UPI & Bank Transfer
                  </Typography>
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  PRIMARY INDIAN UPI ID
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={800}
                  sx={{ fontFamily: "monospace", color: "#172B3A", mb: 2 }}
                >
                  tarun-tiwari@ptyes
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  DIRECT NEFT / RTGS DONATION ACCOUNT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Account Holder: <strong>Tarun Tiwari</strong>
                  <br />• Bank: <strong>Yes Bank</strong>
                  <br />• Account Type:{" "}
                  <strong>Savings / Donation Account</strong>
                  <br />• Account Number:{" "}
                  <strong style={{ color: "#087A52" }}>006691800137107</strong>
                  <br />• IFSC Code: <strong>YESB0000002</strong>
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
