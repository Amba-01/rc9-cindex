import * as fromUser from "./user.actions";

describe("loadUsers", () => {
  it("should return an action", () => {
    expect(fromUser.addUser).toBe("[User] Load Users");
  });
});
