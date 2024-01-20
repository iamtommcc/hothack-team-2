const apiUrl = `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_CODE_API_KEY}`;

async function getData() {
  const payload = {
    frame_name: "no-frame",
    qr_code_text: "https://www.google.com/",
    image_format: "SVG",
    qr_code_logo: "scan-me-square",
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await res.arrayBuffer();
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(
    responseData
  ).toString("base64")}`;

  return { image: dataUrl };
}

export default async function Page() {
  const data = await getData();
  const qrCodeImageUrl = data.image;

  return (
    <main>
      {/* Display the QR code image */}
      <p>The QR CODE</p>
      <img src={qrCodeImageUrl} alt="QR Code" />
    </main>
  );
}
