interface IMailConfig {
  driver: "ethereal" | "Ses";

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "avc",
      name: "acbcas",
    },
  },
} as IMailConfig;
