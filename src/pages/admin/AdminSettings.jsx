import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import { api } from "../../api/client";

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    api
      .getSettings()
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, val) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(settings);
      setNotice({
        open: true,
        message: "Settings and UPI configurations saved successfully!",
        severity: "success",
      });
    } catch (err) {
      setNotice({
        open: true,
        message: err.message || "Save failed",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={3.5}>
        <Typography variant="h4" fontWeight={800} color="#172B3A">
          Organization & Payment Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure verified Indian payment channels, UPI parameters, and
          statutory certificates.
        </Typography>
      </Box>

      {notice.open && (
        <Alert
          severity={notice.severity}
          sx={{ mb: 3 }}
          onClose={() => setNotice({ ...notice, open: false })}
        >
          {notice.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSave}>
        {/* UPI Configuration Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            border: "1.5px solid #087A52",
            bgcolor: "#FAFDFB",
            mb: 4,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <QrCodeRoundedIcon sx={{ color: "#087A52", fontSize: 26 }} />
            <Typography variant="h6" fontWeight={800} color="#087A52">
              Primary Indian UPI Payment Configuration
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Transactions sent to this UPI ID reflect directly in donor receipts
            and checkout modals.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Primary UPI ID (VPA)"
                value={settings.upi_id || "tarun-tiwari@ptyes"}
                onChange={(e) => handleChange("upi_id", e.target.value)}
                helperText="Active UPI ID: tarun-tiwari@ptyes"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                value={settings.account_holder || "Tarun Tiwari"}
                onChange={(e) => handleChange("account_holder", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bank Name"
                value={settings.bank_name || "Yes Bank"}
                onChange={(e) => handleChange("bank_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Account Number"
                value={settings.account_number || "006691800137107"}
                onChange={(e) => handleChange("account_number", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={settings.ifsc_code || "YESB0000002"}
                onChange={(e) => handleChange("ifsc_code", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="QR Code Scanner Image URL / Path"
                value={settings.upi_qr_url || "/upi-qr.png"}
                onChange={(e) => handleChange("upi_qr_url", e.target.value)}
                helperText="Served locally from public/upi-qr.png"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Legal & Statutory Settings */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            border: "1px solid #DCE6E1",
            bgcolor: "#FFFFFF",
            mb: 4,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <VerifiedUserRoundedIcon sx={{ color: "#087A52", fontSize: 24 }} />
            <Typography variant="h6" fontWeight={800} color="#172B3A">
              Statutory NGO Registration Credentials
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={3}>
            These verified numbers appear on all official 80G tax receipts and
            public disclosures.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Official NGO Legal Name"
                value={settings.org_name || "Helping India Foundation"}
                onChange={(e) => handleChange("org_name", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tagline / Motto"
                value={
                  settings.tagline || "Together, We Can Build a Better India"
                }
                onChange={(e) => handleChange("tagline", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="NITI Aayog NGO Darpan ID"
                value={settings.ngo_darpan_id || "DL/2021/0289412"}
                onChange={(e) => handleChange("ngo_darpan_id", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Trust PAN Number"
                value={settings.pan_number || "AAATH9921D"}
                onChange={(e) =>
                  handleChange("pan_number", e.target.value.toUpperCase())
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Section 80G Approval Number"
                value={
                  settings.section_80g_number || "CIT(E)/DEL/80G/2021-22/A/1042"
                }
                onChange={(e) =>
                  handleChange("section_80g_number", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Section 12A Registration Number"
                value={
                  settings.section_12a_number || "CIT(E)/DEL/12A/2021-22/A/5820"
                }
                onChange={(e) =>
                  handleChange("section_12a_number", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Contact & Gateway Settings */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            border: "1px solid #DCE6E1",
            bgcolor: "#FFFFFF",
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight={800} color="#172B3A" mb={2}>
            Secretariat & Gateway Parameters
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Official Contact Email"
                value={settings.contact_email || "contact@helpingindia.org"}
                onChange={(e) => handleChange("contact_email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Helpline Phone"
                value={settings.contact_phone || "+91 99998 41038"}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grievance Officer Email"
                value={settings.grievance_email || "grievance@helpingindia.org"}
                onChange={(e) =>
                  handleChange("grievance_email", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Razorpay Public Key ID (Frontend SDK)"
                value={settings.razorpay_key_id || "rzp_test_placeholder_key"}
                onChange={(e) =>
                  handleChange("razorpay_key_id", e.target.value)
                }
                helperText="Secret keys are stored exclusively in backend .env"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Physical Registered Address"
                value={
                  settings.address ||
                  "A-42, Institutional Area, Sector 62, Noida, NCR - 201309, India"
                }
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={saving}
          startIcon={<SaveRoundedIcon />}
          sx={{ py: 1.5, px: 4, fontWeight: 800 }}
        >
          {saving ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save All Settings"
          )}
        </Button>
      </Box>
    </Box>
  );
}
