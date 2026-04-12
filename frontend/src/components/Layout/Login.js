import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Login() {
return (
    <div style={{
    display: "flex",
    minHeight: "100vh",
    background: "#F5F6FA",
    }}>
      {/* Left Panel */}
    <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #1A1F36 0%, #2D3561 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        color: "#fff",
    }}>
        <Typography style={{
        fontSize: "2.5rem",
        fontWeight: 700,
        marginBottom: "16px",
        color: "#fff"
        }}>
        💰 ExpenseSave
        </Typography>
        <Typography style={{
        fontSize: "1.1rem",
        opacity: 0.7,
        textAlign: "center",
        maxWidth: "300px",
        lineHeight: 1.8
        }}>
        Track your income, monitor expenses, and take control of your financial life.
        </Typography>

        {/* Feature list */}
        <div style={{ marginTop: "48px", width: "100%", maxWidth: "320px" }}>
        {[
            { icon: "📊", text: "Visual charts & monthly reports" },
            { icon: "🔐", text: "Secure Google login" },
            { icon: "🧾", text: "Receipt scanner with OCR" },
            { icon: "💡", text: "Smart spending insights" },
        ].map((item, i) => (
            <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "20px",
            background: "rgba(255,255,255,0.07)",
            padding: "14px 18px",
            borderRadius: "12px",
            }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <Typography style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>
                {item.text}
            </Typography>
            </div>
        ))}
        </div>
    </div>

      {/* Right Panel */}
    <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        background: "linear-gradient(135deg, #F5F6FA 0%, #EEF0F8 100%)",
    }}>
        <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "48px 40px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        }}>
        <img
            src="images/logo.png"
            style={{ width: "80px", marginBottom: "20px" }}
            alt="ExpenseSave"
        />
        <Typography variant="h5" style={{
            fontWeight: 700,
            color: "#1A1F36",
            marginBottom: "8px"
        }}>
            Welcome back!
        </Typography>
        <Typography style={{
            color: "#888",
            fontSize: "14px",
            marginBottom: "36px"
        }}>
            Sign in to manage your finances
        </Typography>

        <Button
            variant="contained"
            href="https://expensesave-backend.onrender.com/auth/google"
            fullWidth
            style={{
            background: "linear-gradient(135deg, #5C6BC0, #26C6DA)",
            color: "#fff",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(92,107,192,0.4)",
            }}
        >
            Sign in with Google
        </Button>

        <Typography style={{
            color: "#bbb",
            fontSize: "12px",
            marginTop: "24px"
        }}>
            By signing in, you agree to our terms of service
        </Typography>
        </div>
    </div>
    </div>
);
}

export default Login;
