type AuthCardProps = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ width: "100%", maxWidth: "360px", padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}