import { render, screen, fireEvent } from "@testing-library/react";
import UserListItem from "./UserListItem";
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from "vitest";

const user = {
  _id: "1",
  name: "Jane Doe",
  email: "jane@example.com",
  pic: "https://example.com/avatar.jpg",
};

function renderWithChakra(ui) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe("UserListItem", () => {
  it("renders user name, email, and avatar", () => {
    renderWithChakra(<UserListItem user={user} handleFunction={() => {}} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("Jane Doe")).toBeInTheDocument();
  });

  it("calls handleFunction with user when clicked", () => {
    const handleFunction = vi.fn();
    renderWithChakra(
      <UserListItem user={user} handleFunction={handleFunction} />
    );
    fireEvent.click(screen.getByText("Jane Doe"));
    expect(handleFunction).toHaveBeenCalledWith(user);
  });
});
