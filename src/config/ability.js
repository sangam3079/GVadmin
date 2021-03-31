import { Ability, AbilityBuilder } from "@casl/ability";
import Cookies from "js-cookie";
import store from "store";
// import {useContext} from 'react'
// import {UserContext} from 'contexts/UserContext'

function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }

  return item.__type;
}

const ability = new Ability([], { subjectName });

let currentRole;

store.subscribe(() => {
  const prevRole = currentRole;
  currentRole =
    store.getState().Profile.currentUser.role || Cookies.get("role");
  if (prevRole !== currentRole) {
    ability.update(defineRulesFor(currentRole));
  }
});

// ability.update(defineRulesFor(role))

function defineRulesFor(role) {
  // console.log(role);
  const { can, rules } = new AbilityBuilder();

  switch (role) {
    case "admin":
      can(
        ["edit", "delete", "create"],
        ["user", "customer", "subscription", "promo-codes"]
      );
  }
  return rules;
}

export default ability;
