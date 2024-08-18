const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        background: "#f7f7f7",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        width: "100%",
      }}
    >
      <p style={{ margin: 0 }}>Tel: 01275830217</p>
      <p style={{ margin: 0 }}>
        Make By Love<span>Mohamed Naguib</span>
      </p>
      <p style={{ margin: 0 }}>mail: mnaguib126@gmail.com</p>
    </footer>
  );
};

export default Footer;
