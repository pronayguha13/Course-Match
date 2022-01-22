import React from "react";

import { SearchBarContextProvider } from "./SearchBarContext";
import { Login } from "./LoginContext";
import { DisplayMode } from "./DisplayContext";
import { MenuDrawer } from "./MenuDrawer";

const Context = ({ children }) => {
  return (
    <DisplayMode>
      <MenuDrawer>
        <Login>
          <SearchBarContextProvider>{children}</SearchBarContextProvider>
        </Login>
      </MenuDrawer>
    </DisplayMode>
  );
};

export default Context;
