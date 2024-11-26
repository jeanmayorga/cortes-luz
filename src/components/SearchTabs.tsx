"use client";

import { SearchFormByAccount } from "./SearchFormByAccount";
import { SearchFormByLocations } from "./SearchFormByLocations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SearchTabs() {
  function mustFocusInputByName(inputName: string) {
    const element = document.getElementsByName(inputName)[0];
    if (element) element.focus();
  }
  return (
    <Tabs
      defaultValue="searchFormByAccount"
      className="w-full p-4 last-of-type:border-b-0 border-b"
    >
      <TabsList className="grid w-full grid-cols-2 rounded-xl mb-4 p-1">
        <TabsTrigger
          className="rounded-xl"
          value="searchFormByAccount"
          onClick={() => mustFocusInputByName("code")}
        >
          Búscar por cuenta
        </TabsTrigger>
        <TabsTrigger
          className="rounded-xl"
          value="searchFormByLocations"
          onClick={() => mustFocusInputByName("locations")}
        >
          Búscar por lugar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="searchFormByAccount">
        <SearchFormByAccount />
      </TabsContent>
      <TabsContent value="searchFormByLocations">
        <SearchFormByLocations />
      </TabsContent>
    </Tabs>
  );
}
