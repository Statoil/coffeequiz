export class Alternative {
  text: string;
  fontSize: string;
  constructor(fromJson: any) {
    if (typeof fromJson === "string") {
      this.text = <string>fromJson;
    }
    else {
      this.text = fromJson.text;
      this.fontSize = fromJson.fontSize;
    }

  }
}
