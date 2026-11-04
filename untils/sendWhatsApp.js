const sendWhatsApp = async (
  mobile,
  name,
  registrationId
) => {
  try {
    const phone = mobile.replace(/\D/g, "");

    if (!/^91[6-9]\d{9}$/.test(phone)) {
      throw new Error("Invalid Indian mobile number");
    }

    const response = await fetch(
      `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: phone,
          type: "template",

          template: {
            name: process.env.WHATSAPP_TEMPLATE_NAME,

            language: {
              code: "en",
            },

            components: [
              {
                type: "body",

                parameters: [
                  {
                    type: "text",
                    text: name,
                  },
                  {
                    type: "text",
                    text: registrationId,
                  },
                ],
              },
            ],
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        JSON.stringify(result)
      );
    }

    console.log("WhatsApp accepted:", result);

    return true;

  } catch (error) {
    console.log("WhatsApp Error:", error.message);

    return false;
  }
};

module.exports = sendWhatsApp;