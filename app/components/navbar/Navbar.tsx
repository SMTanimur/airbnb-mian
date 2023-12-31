"use client"

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";



const Navbar: React.FC = () => {
  const {currentUser}=useCurrentUser()
  return ( 
    <div className="fixed w-full bg-white z-10">
    <div
        className="
            py-4
            border-b-[1px]
            max-h-[80px]
        "
    >
        {/* <Container navbarListings={isOnListingsPage}> */}
        <Container>
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                "
            >
                {/* { isSmallScreen ? (<SmallScreenLogo />) : (<BigScreenLogo />) } */}
                <Logo />
                <Search />
                <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
    </div>
    <Categories />
</div>
  );
}


export default Navbar;