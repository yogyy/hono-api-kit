import type { FC } from "hono/jsx";
import type { User } from "../db/schema";

const styles = {
  container: {
    padding: "40px",
    fontFamily: "system-ui, sans-serif",
    maxWidth: "800px",
    margin: "0 auto"
  },
  title: {
    color: "#f97316",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "20px"
  },
  featureList: {
    listStyle: "none",
    padding: 0
  },
  featureItem: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center"
  },
  checkmark: {
    color: "#f97316",
    marginRight: "10px"
  },
  link: {
    textDecoration: "none",
    fontWeight: "semibold"
  },
  button: {
    color: "#f97316",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "10px 20px",
    border: "2px solid #f97316",
    borderRadius: "6px",
    display: "inline-block"
  },
  apiKeyBox: {
    fontFamily: "monospace",
    padding: "16px",
    background: "#fff7ed",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "2px solid #f97316"
  },
  githubIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
    verticalAlign: "middle"
  }
};

const features = [
  { text: "API Keys" },
  { text: "Rate Limiting" },
  { text: "Authentication with", link: { text: "better-auth", url: "https://www.better-auth.com/" } },
  { text: "Database with", link: { text: "Drizzle", url: "https://drizzle.team" }, extra: { text: "D1", url: "https://developers.cloudflare.com/d1" } },
  { text: "Subscriptions with", link: { text: "Lemonsqueezy", url: "https://lemonsqueezy.com" } },
  { text: "", link: { text: "Integration tests", url: "https://vitest.dev" } }
];

export const Landing: FC<{
  user?: User;
  apiKey?: string;
  subscriptionLink?: string;
}> = ({ user, apiKey, subscriptionLink }) => {
  if (!user) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>⚡️ Backend API Kit</h1>
        <p style={styles.subtitle}>
          Easily create scalable, monetisable backend APIs with Hono + Cloudflare workers
        </p>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Features:</h2>
          <ul style={styles.featureList}>
            {features.map((feature, i) => (
              <li key={`${i}-${feature.text}`} style={styles.featureItem}>
                <span style={styles.checkmark}>✓</span>
                {feature.text}
                {feature.link && (
                  <>&nbsp;<a href={feature.link.url} style={styles.link}>{feature.link.text}</a></>
                )}
                {feature.extra && (
                  <>&nbsp;+&nbsp;<a href={feature.extra.url} style={styles.link}>{feature.extra.text}</a></>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/signin" style={styles.button}>(demo) Sign in</a>
          <a href="https://github.com/dhravya/backend-api-kit" style={{
            ...styles.button,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            // black text & borders
            borderColor: "#000",
            color: "#000"
          }}>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg aria-label="Github icon" alt="Github icon" style={styles.githubIcon} viewBox="0 0 256 250"  xmlns="http://www.w3.org/2000/svg">
              <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Backend API Kit</h1>
      <div style={styles.subtitle}>
        Welcome <span style={{ fontWeight: "bold", color: "#f97316" }}>{user.name}</span>!
      </div>
      <div style={{ marginBottom: "20px" }}>
        {user.email} • {user.subscriptionId ? (
          <span style={{ color: "#f97316", fontWeight: "bold" }}>Premium</span>
        ) : (
          <>
            <span style={{ color: "#6b7280" }}>Free</span> • <a href={subscriptionLink} style={{ color: "#f97316", textDecoration: "none", fontWeight: "bold" }}>&nbsp;Upgrade&nbsp;</a>
          </>
        )}
      </div>
      {apiKey && (
        <div style={styles.apiKeyBox}>
          <div style={{ color: "#666", marginBottom: "8px" }}>Your API Key:</div>
          <div style={{ color: "#f97316", fontWeight: "bold", wordBreak: "break-all" }}>{apiKey}</div>
        </div>
      )}
      <div style={{ marginTop: "40px" }}>
        <a href="/signout" style={styles.button}>Sign out</a>
      </div>
    </div>
  );
};
