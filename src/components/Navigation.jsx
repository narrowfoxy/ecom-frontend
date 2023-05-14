import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import LightIcon from "@mui/icons-material/Light";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_USER_CART_PRODUCTS } from "../GQL/queries";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { reloadDataContext } from "./reloadDataContext";
import { searchDataContext } from "./searchDataContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ hideSearch = false }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const reloadData = React.useContext(reloadDataContext);
  const [totalCount, setTotalCount] = React.useState(0);
  const searchData = React.useContext(searchDataContext);

  const { search, setSearch } = searchData;

  const {
    data = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_USER_CART_PRODUCTS, {
    variables: {
      userCartId: "",
    },
  });

  const navigateToBack = useNavigate();

  React.useEffect(() => {
    if (data && !loading) {
      refetch().then((data) => {
        setTotalCount(getCartSize(data.data));
      });
    }
  }, [loading, reloadData.isReloadData]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function getCartSize(data) {
    const { userCart } = data || {};
    var ItemCart = [];

    if (userCart) {
      var { ItemCart = [] } = userCart;
    }

    let tempTotalItems = 0;
    ItemCart.forEach((item) => {
      tempTotalItems += item.Quantity;
    });
    return tempTotalItems;
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("jwt");

  const onLogoutClick = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const onCartClick = () => {
    navigate("/cart");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem onClick={onLogoutClick}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
          <MenuItem onClick={onCartClick}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={totalCount} color="primary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <LightIcon />
            </IconButton>
            <Link to="/signUp">
              <p>Sign Up</p>
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <PlayCircleFilledWhiteIcon />
            </IconButton>
            <Link to="/login">
              <p>Sign In</p>
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, maxHeight: "70px" }}>
      <AppBar position="static">
        <Toolbar>
          {hideSearch ? (
            <ArrowBackIcon onClick={() => navigateToBack(-1)} />
          ) : null}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link className="ml-4" to="/">
              MarketPlace
            </Link>
          </Typography>
          {hideSearch ? null : (
            <Search
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />

          {isLoggedIn ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Link to="/cart">
                  <Button
                    color="primary"
                    size="small"
                    style={{ color: "white" }}
                  >
                    <Badge badgeContent={totalCount} color="primary">
                      Cart
                    </Badge>
                  </Button>
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Button
                  onClick={onLogoutClick}
                  color="primary"
                  size="small"
                  style={{ color: "white" }}
                >
                  Logout
                </Button>
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Link to="/signup">
                  <Button
                    color="primary"
                    size="small"
                    style={{ color: "white" }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Link to="/login">
                  <Button
                    color="primary"
                    size="small"
                    style={{ color: "white" }}
                  >
                    Sign In
                  </Button>
                </Link>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
