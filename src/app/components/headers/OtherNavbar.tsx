import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout, Person } from "@mui/icons-material";
import ThemeToggle from "../themeToggle";

interface OtherNavbarProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    setLoginOpen,
    setSignupOpen,
    handleCloseLogout,
    handleLogoutClick,
    handleLogoutRequest,
    anchorEl,
  } = props;
  const { authMember } = useGlobals();
  const history = useHistory();
  const goMyPage = () => {
    handleCloseLogout();
    history.push("/member-page");
  };
  const logout = () => {
    handleCloseLogout();
    handleLogoutRequest();
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <span className="brand-wordmark">AUCTION.UZ</span>
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" exact>Home</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">Cars</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/news" activeClassName="underline">Community</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">Help</NavLink>
            </Box>
            {authMember && (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">My Account</NavLink>
              </Box>
            )}

            <ThemeToggle />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
              </Box>
            ) : (
              <button
                type="button"
                className="account-trigger"
                aria-haspopup="menu"
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleLogoutClick}
              >
                <img
                  className="user-avatar"
                  src={authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` : "/icons/default-user.svg"}
                  alt="user avatar"
                />
              </button>
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              slotProps={{
                paper: {
                  elevation: 0,
                  className: "account-menu-paper",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={goMyPage}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                My Page
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
