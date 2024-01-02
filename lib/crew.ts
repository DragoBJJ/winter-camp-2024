/**
 * @todo Prepare a method to return a list of crew members
 * @description The list should only include crew members aged 30 to 40
 */

import fs from "fs";
import yaml from "js-yaml";
import { CrewMember, JSONCrewMember, YamlCrewMember } from "./type";

export const getYamlData = (fileName: string) => {
  const yamlData = fs.readFileSync(fileName, "utf-8");
  return yaml.load(yamlData) as YamlCrewMember[];
};

export const getJSONData = (fileName: string): JSONCrewMember[] => {
  const jsonData = fs.readFileSync(fileName, "utf-8");
  return JSON.parse(jsonData);
};

export const mapYamlDataType = (data: YamlCrewMember[]) => {
  return data.map(({ name, years_old, occupation, nationality }) => {
    return {
      fullName: name,
      nationality,
      age: years_old,
      profession: occupation,
    };
  });
};

export const mapJSONDataType = (data: JSONCrewMember[]) => {
  return data.map(({ firstName, lastName, profession, age, nationality }) => {
    return {
      fullName: `${firstName} ${lastName}`,
      nationality,
      age,
      profession,
    };
  });
};
export const filteredMembersByYear = (members: CrewMember[]) => {
  return members.filter(({ age }) => age >= 30 && age <= 40);
};

export const getMembersData = (fileName: string) => {
  const membersI = getYamlData(`${fileName}.yaml`);
  const membersII = getJSONData(`${fileName}.json`);

  const newMembersI = mapYamlDataType(membersI);
  const newMembersII = mapJSONDataType(membersII);

  const filteredMembers = filteredMembersByYear([
    ...newMembersI,
    ...newMembersII,
  ]);
  return filteredMembers;
};
