import Script from "next/script";
export default function Accesibility() {
  return (
    <div
    style={{
      position: "fixed",
      left: "10px", 
      top: "50%", 
      transform: "translateY(-50%)",
      zIndex: 1000 
    }}
    >
      <Script
         id="external-script"
        src="https://cdn.userway.org/widget.js"
         strategy="lazyOnload"
        data-account="ctsqzOCstg"
        onLoad={() => {
          console.log('Script cargado');
        }}
      ></Script>
    </div>
  );
}
