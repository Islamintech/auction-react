import api from "../../lib/api";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
  public async getTopUsers(): Promise<Member[]> {
    try {
      const result = await api.get("/member/top-users");
      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const result = await api.post("/member/signup", input);
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error signup:", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const result = await api.post("/member/login", input);
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error login:", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const result = await api.post("/member/logout", {});
      localStorage.removeItem("memberData");
      return result.data.logout;
    } catch (err) {
      console.log("Error logout:", err);
      throw err;
    }
  }

  public async getDetail(): Promise<Member> {
    try {
      const result = await api.get("/member/detail");
      return result.data;
    } catch (err) {
      console.log("Error, getDetail:", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberEmail", input.memberEmail || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberCountry", input.memberCountry || "");
      formData.append("memberTelegram", input.memberTelegram || "");
      formData.append("memberDesc", input.memberDesc || "");
      if (input.memberImage instanceof File) {
        formData.append("memberImage", input.memberImage);
      }

      const result = await api.post("/member/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error updateMember:", err);
      throw err;
    }
  }
}

export default MemberService;
