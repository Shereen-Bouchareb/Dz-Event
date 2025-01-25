class DemandeDevisModel {
  constructor(email, question) {
    this.email = email;
    this.question = question;
  }

  static isValid(demandeDevis) {
    return (
      demandeDevis &&
      typeof demandeDevis.email === "string" &&
      typeof demandeDevis.question === "string" &&
      demandeDevis.email.trim() !== "" &&
      demandeDevis.question.trim() !== ""
    );
  }
}

module.exports = DemandeDevisModel;
