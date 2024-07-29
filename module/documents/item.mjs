import { powerRoll } from "../helpers/powerroll.mjs";
import { mpCost } from "../helpers/mpcost.mjs";
import {
  effectVitResPC,
  effectMndResPC,
  effectInitPC,
  effectMKnowPC,
  effectVitResMon,
  effectMndResMon,
  effectHitMon,
  effectDmgMon,
  effectDodgeMon,
  effectScpMon,
  effectCnpMon,
  effectWzpMon,
  effectPrpMon,
  effectMtpMon,
  effectFrpMon,
  effectDrpMon,
  effectDmpMon,
} from "../sw25.mjs";

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class SW25Item extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.sw25 || {};

    this._prepareSkillData(itemData);
    this._prepareCheckData(itemData);
    this._prepareItemRollData(itemData);
    this._prepareWeaponData(itemData);
    this._prepareArmorData(itemData);
    this._prepareAccessoryData(itemData);
    this._prepareItemData(itemData);
    this._prepareResourceData(itemData);
    this._prepareCombatabilityData(itemData);
    this._prepareEnhanceartsData(itemData);
    this._prepareMagicalsongData(itemData);
    this._prepareRidingtrickData(itemData);
    this._prepareAlchemytechData(itemData);
    this._preparePhaseareaData(itemData);
    this._prepareTacticsData(itemData);
    this._prepareOtherFeatureData(itemData);
    this._prepareRaceabilityData(itemData);
    this._prepareLanguageData(itemData);
    this._prepareSpellData(itemData);
    this._prepareMonsterabilityData(itemData);
  }

  async _prepareSkillData(itemData) {
    if (itemData.type !== "skill") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actor = game.actors.get(itemData.actor._id);
    await actor.update({});
    const actorData = itemData.actor.system;

    //Calculate SkillBase
    if (!actorData.effect) systemData.efallskmod = 0;
    else if (actorData.effect.allsk)
      systemData.efallskmod = Number(actorData.effect.allsk);
    else systemData.efallskmod = 0;

    const dexmod = Math.floor(
      (actorData.abilities.dex.racevalue +
        actorData.abilities.dex.valuebase +
        actorData.abilities.dex.valuegrowth +
        actorData.abilities.dex.valuemodify) /
        6 +
        Number(actorData.abilities.dex.efmodify)
    );
    systemData.skillbase.dex =
      Number(systemData.skilllevel) +
      Number(dexmod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.dexnef =
      Number(systemData.skilllevel) +
      Number(dexmod) +
      Number(systemData.skillmod);
    const agimod = Math.floor(
      (actorData.abilities.dex.racevalue +
        actorData.abilities.agi.valuebase +
        actorData.abilities.agi.valuegrowth +
        actorData.abilities.agi.valuemodify) /
        6 +
        Number(actorData.abilities.agi.efmodify)
    );
    systemData.skillbase.agi =
      Number(systemData.skilllevel) +
      Number(agimod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.aginef =
      Number(systemData.skilllevel) +
      Number(agimod) +
      Number(systemData.skillmod);
    const strmod = Math.floor(
      (actorData.abilities.str.racevalue +
        actorData.abilities.str.valuebase +
        actorData.abilities.str.valuegrowth +
        actorData.abilities.str.valuemodify) /
        6 +
        Number(actorData.abilities.str.efmodify)
    );
    systemData.skillbase.str =
      Number(systemData.skilllevel) +
      Number(strmod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.strnef =
      Number(systemData.skilllevel) +
      Number(strmod) +
      Number(systemData.skillmod);
    const vitmod = Math.floor(
      (actorData.abilities.str.racevalue +
        actorData.abilities.vit.valuebase +
        actorData.abilities.vit.valuegrowth +
        actorData.abilities.vit.valuemodify) /
        6 +
        Number(actorData.abilities.vit.efmodify)
    );
    systemData.skillbase.vit =
      Number(systemData.skilllevel) +
      Number(vitmod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.vitnef =
      Number(systemData.skilllevel) +
      Number(vitmod) +
      Number(systemData.skillmod);
    const intmod = Math.floor(
      (actorData.abilities.int.racevalue +
        actorData.abilities.int.valuebase +
        actorData.abilities.int.valuegrowth +
        actorData.abilities.int.valuemodify) /
        6 +
        Number(actorData.abilities.int.efmodify)
    );
    systemData.skillbase.int =
      Number(systemData.skilllevel) +
      Number(intmod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.intnef =
      Number(systemData.skilllevel) +
      Number(intmod) +
      Number(systemData.skillmod);
    const mndmod = Math.floor(
      (actorData.abilities.int.racevalue +
        actorData.abilities.mnd.valuebase +
        actorData.abilities.mnd.valuegrowth +
        actorData.abilities.mnd.valuemodify) /
        6 +
        Number(actorData.abilities.mnd.efmodify)
    );
    systemData.skillbase.mnd =
      Number(systemData.skilllevel) +
      Number(mndmod) +
      Number(systemData.skillmod) +
      Number(systemData.efallskmod);
    systemData.skillbase.mndnef =
      Number(systemData.skilllevel) +
      Number(mndmod) +
      Number(systemData.skillmod);

    // Calculate Exp
    if (systemData.exptable == "-") {
      systemData.skillexp = 0;
    }
    if (systemData.exptable == "A") {
      const expA = [
        0, 1000, 2000, 3500, 5000, 7000, 9500, 12500, 16500, 21500, 27500,
        35000, 44000, 54500, 66500, 80000,
      ];
      systemData.skillexp = expA[systemData.skilllevel];
    }
    if (systemData.exptable == "B") {
      const expB = [
        0, 500, 1500, 2500, 4000, 5500, 7500, 10000, 13000, 17000, 22000, 28000,
        35500, 44500, 55000, 67000,
      ];
      systemData.skillexp = expB[systemData.skilllevel];
    }

    // Sheet refresh
    await itemData.update({});
    if (itemData.sheet.rendered)
      await itemData.sheet.render(true, { focus: false });
  }

  async _prepareCheckData(itemData) {
    if (itemData.type !== "check") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actor = game.actors.get(itemData.actor._id);
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    // Calculate Base Number

    let levelmod = 0;
    if (!Array.isArray(systemData.skilllist)) {
      systemData.skilllist = [];
    }
    actoritemData.forEach((item) => {
      if (item.type != "skill") return;
      if (!systemData.skilllist.includes(item.name)) {
        systemData.skilllist.push(item.name);
      }
      if (systemData.checkskill == "adv") {
        if (
          item.system.skilltype == "fighterskill" ||
          item.system.skilltype == "magicuserskill" ||
          item.system.skilltype == "otherskill"
        ) {
          if (item.system.skilllevel > levelmod)
            levelmod = item.system.skilllevel;
        }
      }
      if (systemData.checkskill == item.name) {
        levelmod = Number(item.system.skilllevel);
      }
    });

    await actor.update({});
    let abimod = 0;
    if (systemData.checkabi == "dex")
      abimod = Math.floor(
        (actorData.abilities.dex.racevalue +
          actorData.abilities.dex.valuebase +
          actorData.abilities.dex.valuegrowth +
          actorData.abilities.dex.valuemodify) /
          6 +
          Number(actorData.abilities.dex.efmodify)
      );
    if (systemData.checkabi == "agi")
      abimod = Math.floor(
        (actorData.abilities.dex.racevalue +
          actorData.abilities.agi.valuebase +
          actorData.abilities.agi.valuegrowth +
          actorData.abilities.agi.valuemodify) /
          6 +
          Number(actorData.abilities.agi.efmodify)
      );
    if (systemData.checkabi == "str")
      abimod = Math.floor(
        (actorData.abilities.str.racevalue +
          actorData.abilities.str.valuebase +
          actorData.abilities.str.valuegrowth +
          actorData.abilities.str.valuemodify) /
          6 +
          Number(actorData.abilities.str.efmodify)
      );
    if (systemData.checkabi == "vit")
      abimod = Math.floor(
        (actorData.abilities.str.racevalue +
          actorData.abilities.vit.valuebase +
          actorData.abilities.vit.valuegrowth +
          actorData.abilities.vit.valuemodify) /
          6 +
          Number(actorData.abilities.vit.efmodify)
      );
    if (systemData.checkabi == "int")
      abimod = Math.floor(
        (actorData.abilities.int.racevalue +
          actorData.abilities.int.valuebase +
          actorData.abilities.int.valuegrowth +
          actorData.abilities.int.valuemodify) /
          6 +
          Number(actorData.abilities.int.efmodify)
      );
    if (systemData.checkabi == "mnd")
      abimod = Math.floor(
        (actorData.abilities.int.racevalue +
          actorData.abilities.mnd.valuebase +
          actorData.abilities.mnd.valuegrowth +
          actorData.abilities.mnd.valuemodify) /
          6 +
          Number(actorData.abilities.mnd.efmodify)
      );

    if (!actorData.effect) systemData.efckmod = 0;
    else {
      switch (itemData.name) {
        case effectVitResPC:
          if (actorData.effect.vitres)
            systemData.efckmod = Number(actorData.effect.vitres);
          break;
        case effectMndResPC:
          if (actorData.effect.mndres)
            systemData.efckmod = Number(actorData.effect.mndres);
          break;
        case effectInitPC:
          if (actorData.effect.init)
            systemData.efckmod = Number(actorData.effect.init);
          break;
        case effectMKnowPC:
          if (actorData.effect.mknow)
            systemData.efckmod = Number(actorData.effect.mknow);
          break;
        default:
          systemData.efckmod = 0;
          break;
      }
      if (actorData.effect.allck)
        systemData.efallckmod = Number(actorData.effect.allck);
    }

    systemData.checkbase =
      Number(systemData.checkmod) +
      Number(systemData.checkfixmod) +
      Number(systemData.efckmod) +
      Number(systemData.efallckmod) +
      Number(levelmod) +
      Number(abimod);

    // Roll Setting
    if (systemData.checkmethod == "normal") systemData.formula = "2d6";
    if (systemData.checkmethod == "dice")
      systemData.formula = systemData.customformula;
    if (systemData.checkmethod == "power") {
      systemData.formula = "2d6";
    }

    if (systemData.cvalue == null || systemData.cvalue == 0)
      systemData.cvalue = 10;
    if (!actorData.effect) actorData.efcmod = 0;
    else if (actorData.effect.efcvalue)
      actorData.efcmod = Number(actorData.effect.efcvalue);
    else actorData.efcmod = 0;
    systemData.totalcvalue =
      Number(systemData.cvalue) + Number(actorData.efcmod);

    let halfpow, halfpowmod, lethaltech, criticalray, pharmtool, powup;
    if (systemData.halfpow == true) halfpow = 1;
    else halfpow = 0;
    if (systemData.halfpowmod == null || systemData.halfpowmod == 0)
      halfpowmod = 0;
    else halfpowmod = systemData.halfpowmod;
    if (systemData.lethaltech == null || systemData.lethaltech == 0)
      lethaltech = 0;
    else lethaltech = systemData.lethaltech;
    if (systemData.criticalray == null || systemData.criticalray == 0)
      criticalray = 0;
    else criticalray = systemData.criticalray;
    if (systemData.pharmtool == null || systemData.pharmtool == 0)
      pharmtool = 0;
    else pharmtool = systemData.pharmtool;
    if (systemData.powup == null || systemData.powup == 0) powup = 0;
    else powup = systemData.powup;

    systemData.powertable = [
      systemData.power,
      systemData.totalcvalue,
      0,
      systemData.pt3,
      systemData.pt4,
      systemData.pt5,
      systemData.pt6,
      systemData.pt7,
      systemData.pt8,
      systemData.pt9,
      systemData.pt10,
      systemData.pt11,
      systemData.pt12,
      systemData.checkbase,
      halfpow,
      halfpowmod,
      lethaltech,
      criticalray,
      pharmtool,
      powup,
    ];

    // Sheet refresh
    await actor.update({});
    if (actor.sheet.rendered) await actor.sheet.render(true, { focus: false });
    await itemData.update({});
    if (itemData.sheet.rendered)
      await itemData.sheet.render(true, { focus: false });
  }

  async _prepareItemRollData(itemData) {
    if (
      itemData.type !== "skill" &&
      itemData.type !== "weapon" &&
      itemData.type !== "armor" &&
      itemData.type !== "accessory" &&
      itemData.type !== "item" &&
      itemData.type !== "spell" &&
      itemData.type !== "enhancearts" &&
      itemData.type !== "magicalsong" &&
      itemData.type !== "ridingtrick" &&
      itemData.type !== "alchemytech" &&
      itemData.type !== "phasearea" &&
      itemData.type !== "tactics" &&
      itemData.type !== "otherfeature" &&
      itemData.type !== "resource" &&
      itemData.type !== "combatability" &&
      itemData.type !== "raceability" &&
      itemData.type !== "monsterability"
    )
      return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actor = game.actors.get(itemData.actor._id);
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;
    if (itemData.effects.size > 0) systemData.useeffect = true;
    else systemData.useeffect = false;

    // Calculate Base Number

    if (!Array.isArray(systemData.skilllist)) {
      systemData.skilllist = [];
    }

    let checklevelmod = 0;
    let powerlevelmod = 0;
    actoritemData.forEach((item) => {
      if (item.type != "skill") return;
      if (!systemData.skilllist.includes(item.name)) {
        systemData.skilllist.push(item.name);
      }
      if (systemData.checkskill == "adv") {
        if (
          item.system.skilltype == "fighterskill" ||
          item.system.skilltype == "magicuserskill" ||
          item.system.skilltype == "otherskill"
        ) {
          if (item.system.skilllevel > checklevelmod)
            checklevelmod = item.system.skilllevel;
        }
      }
      if (systemData.checkskill == item.name) {
        checklevelmod = Number(item.system.skilllevel);
      }
      if (systemData.powerskill == "adv") {
        if (
          item.system.skilltype == "fighterskill" ||
          item.system.skilltype == "magicuserskill" ||
          item.system.skilltype == "otherskill"
        ) {
          if (item.system.skilllevel > powerlevelmod)
            powerlevelmod = item.system.skilllevel;
        }
      }
      if (systemData.powerskill == item.name) {
        powerlevelmod = Number(item.system.skilllevel);
      }
    });

    await actor.update({});
    let checkabimod = 0;
    let powerabimod = 0;
    if (actor.type == "character") {
      if (systemData.checkabi == "dex")
        checkabimod = Math.floor(
          (actorData.abilities.dex.racevalue +
            actorData.abilities.dex.valuebase +
            actorData.abilities.dex.valuegrowth +
            actorData.abilities.dex.valuemodify) /
            6 +
            Number(actorData.abilities.dex.efmodify)
        );
      if (systemData.checkabi == "agi")
        checkabimod = Math.floor(
          (actorData.abilities.dex.racevalue +
            actorData.abilities.agi.valuebase +
            actorData.abilities.agi.valuegrowth +
            actorData.abilities.agi.valuemodify) /
            6 +
            Number(actorData.abilities.agi.efmodify)
        );
      if (systemData.checkabi == "str")
        checkabimod = Math.floor(
          (actorData.abilities.str.racevalue +
            actorData.abilities.str.valuebase +
            actorData.abilities.str.valuegrowth +
            actorData.abilities.str.valuemodify) /
            6 +
            Number(actorData.abilities.str.efmodify)
        );
      if (systemData.checkabi == "vit")
        checkabimod = Math.floor(
          (actorData.abilities.str.racevalue +
            actorData.abilities.vit.valuebase +
            actorData.abilities.vit.valuegrowth +
            actorData.abilities.vit.valuemodify) /
            6 +
            Number(actorData.abilities.vit.efmodify)
        );
      if (systemData.checkabi == "int")
        checkabimod = Math.floor(
          (actorData.abilities.int.racevalue +
            actorData.abilities.int.valuebase +
            actorData.abilities.int.valuegrowth +
            actorData.abilities.int.valuemodify) /
            6 +
            Number(actorData.abilities.int.efmodify)
        );
      if (systemData.checkabi == "mnd")
        checkabimod = Math.floor(
          (actorData.abilities.int.racevalue +
            actorData.abilities.mnd.valuebase +
            actorData.abilities.mnd.valuegrowth +
            actorData.abilities.mnd.valuemodify) /
            6 +
            Number(actorData.abilities.mnd.efmodify)
        );
      if (systemData.powerabi == "dex")
        powerabimod = Math.floor(
          (actorData.abilities.dex.racevalue +
            actorData.abilities.dex.valuebase +
            actorData.abilities.dex.valuegrowth +
            actorData.abilities.dex.valuemodify) /
            6 +
            Number(actorData.abilities.dex.efmodify)
        );
      if (systemData.powerabi == "agi")
        powerabimod = Math.floor(
          (actorData.abilities.dex.racevalue +
            actorData.abilities.agi.valuebase +
            actorData.abilities.agi.valuegrowth +
            actorData.abilities.agi.valuemodify) /
            6 +
            Number(actorData.abilities.agi.efmodify)
        );
      if (systemData.powerabi == "str")
        powerabimod = Math.floor(
          (actorData.abilities.str.racevalue +
            actorData.abilities.str.valuebase +
            actorData.abilities.str.valuegrowth +
            actorData.abilities.str.valuemodify) /
            6 +
            Number(actorData.abilities.str.efmodify)
        );
      if (systemData.powerabi == "vit")
        powerabimod = Math.floor(
          (actorData.abilities.str.racevalue +
            actorData.abilities.vit.valuebase +
            actorData.abilities.vit.valuegrowth +
            actorData.abilities.vit.valuemodify) /
            6 +
            Number(actorData.abilities.vit.efmodify)
        );
      if (systemData.powerabi == "int")
        powerabimod = Math.floor(
          (actorData.abilities.int.racevalue +
            actorData.abilities.int.valuebase +
            actorData.abilities.int.valuegrowth +
            actorData.abilities.int.valuemodify) /
            6 +
            Number(actorData.abilities.int.efmodify)
        );
      if (systemData.powerabi == "mnd")
        powerabimod = Math.floor(
          (actorData.abilities.int.racevalue +
            actorData.abilities.mnd.valuebase +
            actorData.abilities.mnd.valuegrowth +
            actorData.abilities.mnd.valuemodify) /
            6 +
            Number(actorData.abilities.mnd.efmodify)
        );
    }

    systemData.checkbase =
      Number(systemData.checkmod) + Number(checklevelmod) + Number(checkabimod);
    systemData.powerbase =
      Number(systemData.powermod) + Number(powerlevelmod) + Number(powerabimod);

    systemData.checkbase1 =
      Number(systemData.checkbasemod1) + Number(systemData.checkmod1);
    systemData.checkbasefix1 = Number(systemData.checkbase1) + 7;
    systemData.checkbase2 =
      Number(systemData.checkbasemod2) + Number(systemData.checkmod2);
    systemData.checkbasefix2 = Number(systemData.checkbase2) + 7;
    systemData.checkbase3 =
      Number(systemData.checkbasemod3) + Number(systemData.checkmod3);
    systemData.checkbasefix3 = Number(systemData.checkbase3) + 7;

    if (itemData.type == "weapon") {
      systemData.checkbase =
        Number(systemData.checkbase) +
        Number(systemData.hit) +
        Number(actorData.attributes.hitmod) +
        Number(actorData.attributes.efhitmod);
      systemData.powerbase =
        Number(systemData.powerbase) +
        Number(systemData.dmod) +
        Number(actorData.attributes.dmod) +
        Number(actorData.attributes.efdmod);
    }

    if (itemData.type == "spell") {
      if (!actorData.effect) systemData.efallmgpmod = 0;
      else if (actorData.effect.allmgp)
        systemData.efallmgpmod = Number(actorData.effect.allmgp);
      else systemData.efallmgpmod = 0;
      systemData.checkbase =
        Number(systemData.checkbase) + Number(systemData.efallmgpmod);
      systemData.powerbase =
        Number(systemData.powerbase) + Number(systemData.efallmgpmod);

      switch (systemData.type) {
        case "sorcerer":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.scmod + Number(actorData.attributes.efscmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.scmod + Number(actorData.attributes.efscmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpsc) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "conjurer":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.cnmod + Number(actorData.attributes.efcnmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.cnmod + Number(actorData.attributes.efcnmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpcn) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "wizard":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.wzmod + Number(actorData.attributes.efwzmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.wzmod + Number(actorData.attributes.efwzmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpwz) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "priest":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.prmod + Number(actorData.attributes.efprmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.prmod + Number(actorData.attributes.efprmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmppr) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "magitech":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.mtmod + Number(actorData.attributes.efmtmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.mtmod + Number(actorData.attributes.efmtmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpmt) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "fairy":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.frmod + Number(actorData.attributes.effrmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.frmod + Number(actorData.attributes.effrmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpfr) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "druid":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.drmod + Number(actorData.attributes.efdrmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.drmod + Number(actorData.attributes.efdrmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpdr) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        case "daemon":
          systemData.checkbase =
            Number(systemData.checkbase) +
            Number(
              actorData.attributes.dmmod + Number(actorData.attributes.efdmmod)
            );
          systemData.powerbase =
            Number(systemData.powerbase) +
            Number(
              actorData.attributes.dmmod + Number(actorData.attributes.efdmmod)
            );
          systemData.mpcost =
            Number(systemData.basempcost) -
            Number(actorData.attributes.efmpdm) -
            Number(actorData.attributes.efmpall);
          if (systemData.mpcost < 1) systemData.mpcost = 1;
          break;
        default:
          break;
      }
    }

    if (itemData.type == "enhancearts") {
      systemData.mpcost =
        Number(systemData.basempcost) - Number(actorData.attributes.efmpall);
      if (systemData.mpcost < 1) systemData.mpcost = 1;
    }

    if (itemData.type == "otherfeature") {
      systemData.mpcost =
        Number(systemData.basempcost) - Number(actorData.attributes.efmpall);
      if (systemData.mpcost < 1) systemData.mpcost = 1;
      if (systemData.basempcost == 0 || systemData.basempcost != null)
        systemData.mpcost = 0;
    }

    if (itemData.type == "monsterability") {
      if (!actorData.effect) {
        systemData.efmod = 0;
        systemData.efallckmod = 0;
        systemData.efallmgpmod = 0;
        actorData.effect = {
          allck: "",
          allmgp: "",
          vitres: "",
          mndres: "",
        };
      }
      for (let i = 1; i <= 3; i++) {
        if (actorData.effect.allck)
          systemData.efallckmod = Number(actorData.effect.allck);
        else systemData.efallckmod = 0;
        if (actorData.effect.allmgp)
          systemData.efallmgpmod = Number(actorData.effect.allmgp);
        else systemData.efallmgpmod = 0;
        systemData.efmod = 0;
        switch (itemData.system[`label${i}`]) {
          case effectVitResMon:
            if (actorData.effect.vitres)
              systemData.efmod = Number(actorData.effect.vitres);
            break;
          case effectMndResMon:
            if (actorData.effect.mndres)
              systemData.efmod = Number(actorData.effect.mndres);
            break;
          case effectHitMon:
            if (actorData.attributes.efhitmod)
              systemData.efmod = Number(actorData.attributes.efhitmod);
            break;
          case effectDmgMon:
            if (actorData.attributes.efdmod)
              systemData.efmod = Number(actorData.attributes.efdmod);
            systemData.efallckmod = 0;
            break;
          case effectDodgeMon:
            if (actorData.attributes.efdodgemod)
              systemData.efmod = Number(actorData.attributes.efdodgemod);
            break;
          case effectScpMon:
            if (actorData.attributes.efscmod)
              systemData.efmod =
                Number(actorData.attributes.efscmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectCnpMon:
            if (actorData.attributes.efcnmod)
              systemData.efmod =
                Number(actorData.attributes.efcnmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectWzpMon:
            if (actorData.attributes.efwzmod)
              systemData.efmod =
                Number(actorData.attributes.efwzmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectPrpMon:
            if (actorData.attributes.efprmod)
              systemData.efmod =
                Number(actorData.attributes.efprmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectMtpMon:
            if (actorData.attributes.efmtmod)
              systemData.efmod =
                Number(actorData.attributes.efmtmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectFrpMon:
            if (actorData.attributes.effrmod)
              systemData.efmod =
                Number(actorData.attributes.effrmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectDrpMon:
            if (actorData.attributes.efdrmod)
              systemData.efmod =
                Number(actorData.attributes.efdrmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          case effectDmpMon:
            if (actorData.attributes.efdmmod)
              systemData.efmod =
                Number(actorData.attributes.efdmmod) +
                Number(systemData.efallmgpmod);
            else systemData.efmod = Number(systemData.efallmgpmod);
            systemData.efallckmod = 0;
            break;
          default:
            systemData.efmod = 0;
            break;
        }
        systemData[`checkbase${i}`] =
          Number(systemData[`checkbasemod${i}`]) +
          Number(systemData[`checkmod${i}`]) +
          Number(systemData.efmod) +
          Number(systemData.efallckmod);
        systemData[`checkbasefix${i}`] =
          Number(systemData[`checkbase${i}`]) + 7;
      }
    }

    // Roll Setting
    if (systemData.clickitem == "all") systemData.formula = "2d6";
    if (systemData.clickitem == "dice") {
      if (systemData.customdice == true)
        systemData.formula = systemData.customformula;
      else systemData.formula = "2d6";
    }
    if (systemData.clickitem == "dice1") {
      systemData.checkbase = systemData.checkbase1;
      if (systemData.usefix1 == true) {
        systemData.formula = 7;
      } else if (systemData.customdice1 == true)
        systemData.formula = systemData.customformula1;
      else systemData.formula = "2d6";
    }
    if (systemData.clickitem == "dice2") {
      systemData.checkbase = systemData.checkbase2;
      if (systemData.usefix2 == true) {
        systemData.formula = 7;
      } else if (systemData.customdice2 == true)
        systemData.formula = systemData.customformula2;
      else systemData.formula = "2d6";
    }
    if (systemData.clickitem == "dice3") {
      systemData.checkbase = systemData.checkbase3;
      if (systemData.usefix2 == true) {
        systemData.formula = 7;
      } else if (systemData.customdice3 == true)
        systemData.formula = systemData.customformula3;
      else systemData.formula = "2d6";
    }
    if (systemData.clickitem == "power") systemData.formula = "2d6";
    if (systemData.clickitem == "description") systemData.formula = "";

    if (systemData.customdice == true)
      systemData.checkformula = systemData.customformula;
    else systemData.checkformula = "2d6";
    systemData.powerformula = "2d6";

    if (systemData.usefix1 == true) {
      systemData.checkformula1 = 7;
    } else if (systemData.customdice1 == true)
      systemData.checkformula1 = systemData.customformula1;
    else systemData.checkformula1 = "2d6";
    if (systemData.usefix2 == true) {
      systemData.checkformula2 = 7;
    } else if (systemData.customdice2 == true)
      systemData.checkformula2 = systemData.customformula2;
    else systemData.checkformula2 = "2d6";
    if (systemData.usefix3 == true) {
      systemData.checkformula3 = 7;
    } else if (systemData.customdice3 == true)
      systemData.checkformula3 = systemData.customformula3;
    else systemData.checkformula3 = "2d6";

    if (systemData.cvalue == null || systemData.cvalue == 0)
      systemData.cvalue = 10;
    if (!actorData.effect) actorData.efcmod = 0;
    else if (actorData.effect.efcvalue)
      actorData.efcmod = Number(actorData.effect.efcvalue);
    else actorData.efcmod = 0;
    if (itemData.type == "spell") {
      if (!actorData.effect) actorData.efcmod = 0;
      else if (actorData.effect.efspellcvalue)
        actorData.efcmod = Number(actorData.effect.efspellcvalue);
      else actorData.efcmod = 0;
    }
    systemData.totalcvalue =
      Number(systemData.cvalue) + Number(actorData.efcmod);

    let halfpow, halfpowmod, lethaltech, criticalray, pharmtool, powup;
    if (systemData.halfpow == true) halfpow = 1;
    else halfpow = 0;
    if (systemData.halfpowmod == null || systemData.halfpowmod == 0)
      halfpowmod = 0;
    else halfpowmod = systemData.halfpowmod;
    if (systemData.lethaltech == null || systemData.lethaltech == 0)
      lethaltech = 0;
    else lethaltech = systemData.lethaltech;
    if (systemData.criticalray == null || systemData.criticalray == 0)
      criticalray = 0;
    else criticalray = systemData.criticalray;
    if (systemData.pharmtool == null || systemData.pharmtool == 0)
      pharmtool = 0;
    else pharmtool = systemData.pharmtool;
    if (systemData.powup == null || systemData.powup == 0) powup = 0;
    else powup = systemData.powup;

    systemData.powertable = [
      systemData.power,
      systemData.totalcvalue,
      0,
      systemData.pt3,
      systemData.pt4,
      systemData.pt5,
      systemData.pt6,
      systemData.pt7,
      systemData.pt8,
      systemData.pt9,
      systemData.pt10,
      systemData.pt11,
      systemData.pt12,
      systemData.powerbase,
      halfpow,
      halfpowmod,
      lethaltech,
      criticalray,
      pharmtool,
      powup,
    ];

    // Sheet refresh
    await actor.update({});
    if (actor.sheet.rendered) await actor.sheet.render(true, { focus: false });
    await itemData.update({});
    if (itemData.sheet.rendered)
      await itemData.sheet.render(true, { focus: false });
  }

  _prepareItemData(itemData) {
    if (itemData.type !== "item") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(`SW25.Item.Item.${i18ntype}`);
    } else systemData.typename = game.i18n.localize(`SW25.Item.Item.General`);

    // Set default skill and ability
    if (systemData.type == "herb") {
      if (actorData.herbskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.herbskill;
        if (systemData.checkabi == "-") systemData.checkabi = "dex";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.herbskill;
        if (systemData.powerabi == "-") systemData.powerabi = "dex";
      }
    }
    if (systemData.type == "potion") {
      if (actorData.potionskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.potionskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.potionskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "repair") {
      if (actorData.repairskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.repairskill;
        if (systemData.checkabi == "-") systemData.checkabi = "dex";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.repairskill;
        if (systemData.powerabi == "-") systemData.powerabi = "dex";
      }
    }
  }
  _prepareResourceData(itemData) {}

  _prepareWeaponData(itemData) {
    if (itemData.type !== "weapon") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.category != "-") {
      const i18ncat =
        systemData.category.charAt(0).toUpperCase() +
        systemData.category.slice(1);
      systemData.categoryname = game.i18n.localize(
        `SW25.Item.Weapon.${i18ncat}`
      );
    } else systemData.categoryname = "-";

    if (systemData.usage != "-") {
      const i18nusage = systemData.usage;
      systemData.usagename = game.i18n.localize(
        `SW25.Item.Weapon.${i18nusage}`
      );
    } else systemData.usage = "-";

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(`SW25.Item.Weapon.${i18ntype}`);
    } else systemData.typename = "";

    if (systemData.checkskill == systemData.powerskill) {
      systemData.showskill = systemData.checkskill;
    } else
      systemData.showskill =
        systemData.checkskill + "/" + systemData.powerskill;
    if (systemData.checkskill == "-" || systemData.checkskill == null) {
      if (systemData.powerskill == "-" || systemData.powerskill == null)
        systemData.showskill = "";
      else systemData.showskill = systemData.powerskill;
    }
    if (systemData.powerskill == "-" || systemData.powerskill == null) {
      if (systemData.checkskill == "-" || systemData.checkskill == null)
        systemData.showskill = "";
      else systemData.showskill = systemData.checkskill;
    }

    // Set default skill and ability
    if (actorData.attackskill != "-") {
      if (systemData.checkskill == "-")
        systemData.checkskill = actorData.attackskill;
      if (systemData.checkabi == "-") systemData.checkabi = "dex";
      if (systemData.powerskill == "-")
        systemData.powerskill = actorData.attackskill;
      if (systemData.powerabi == "-") systemData.powerabi = "str";
    }
  }

  _prepareAccessoryData(itemData) {
    if (itemData.type !== "accessory") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.accpart != "-") {
      const i18npart =
        systemData.accpart.charAt(0).toUpperCase() +
        systemData.accpart.slice(1);
      systemData.accpartname = game.i18n.localize(
        `SW25.Item.Accessory.${i18npart}`
      );
    } else systemData.accpartname = "-";

    if (systemData.deffect != "-") {
      systemData.deffectname = ":" + systemData.deffect.toUpperCase();
    } else systemData.deffectname = "";
  }

  _prepareArmorData(itemData) {
    if (itemData.type !== "armor") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.category != "-") {
      const i18ncat =
        systemData.category.charAt(0).toUpperCase() +
        systemData.category.slice(1);
      systemData.categoryname = game.i18n.localize(
        `SW25.Item.Armor.${i18ncat}`
      );
    } else systemData.categoryname = "-";
  }

  _prepareCombatabilityData(itemData) {
    if (itemData.type !== "combatability") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(
        `SW25.Item.Combatability.${i18ntype}`
      );
    } else systemData.typename = "-";

    if (systemData.condtype != "-") {
      const i18ncondtype =
        systemData.condtype.charAt(0).toUpperCase() +
        systemData.condtype.slice(1);
      systemData.condtypename = game.i18n.localize(
        `SW25.Item.Combatability.${i18ncondtype}`
      );
    } else systemData.condtypename = "-";
  }
  _prepareEnhanceartsData(itemData) {}

  _prepareMagicalsongData(itemData) {
    if (itemData.type !== "magicalsong") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(
        `SW25.Item.Magicalsong.${i18ntype}`
      );
    } else systemData.typename = "-";

    if (systemData.resist != "-") {
      const i18nresist =
        systemData.resist.charAt(0).toUpperCase() + systemData.resist.slice(1);
      systemData.resistname = game.i18n.localize(`SW25.Item.${i18nresist}`);
    } else systemData.resistname = "-";

    if (systemData.prop != "-") {
      const i18nprop =
        systemData.prop.charAt(0).toUpperCase() + systemData.prop.slice(1);
      systemData.propname = game.i18n.localize(`SW25.Item.${i18nprop}`);
    } else systemData.propname = "-";

    if (systemData.upget == null) systemData.upget = 0;
    if (systemData.downget == null) systemData.downget = 0;
    if (systemData.charmget == null) systemData.charmget = 0;
    if (systemData.upadd == null) systemData.upadd = 0;
    if (systemData.downadd == null) systemData.downadd = 0;
    if (systemData.charmadd == null) systemData.charmadd = 0;
    if (systemData.upcond == null) systemData.upcond = 0;
    if (systemData.downcond == null) systemData.downcond = 0;
    if (systemData.charmcond == null) systemData.charmcond = 0;
    if (systemData.upcost == null) systemData.upcost = 0;
    if (systemData.downcost == null) systemData.downcost = 0;
    if (systemData.charmcost == null) systemData.charmcost = 0;
  }

  _prepareRidingtrickData(itemData) {}

  _prepareAlchemytechData(itemData) {
    if (itemData.type !== "alchemytech") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.resist != "-") {
      const i18nresist =
        systemData.resist.charAt(0).toUpperCase() + systemData.resist.slice(1);
      systemData.resistname = game.i18n.localize(`SW25.Item.${i18nresist}`);
    } else systemData.resistname = "-";

    if (systemData.red == null) systemData.red = 0;
    if (systemData.green == null) systemData.green = 0;
    if (systemData.black == null) systemData.black = 0;
    if (systemData.white == null) systemData.white = 0;
    if (systemData.gold == null) systemData.gold = 0;
  }

  _preparePhaseareaData(itemData) {
    if (itemData.type !== "phasearea") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(
        `SW25.Item.Phasearea.${i18ntype}`
      );
    } else systemData.typename = "-";

    if (systemData.prop != "-") {
      const i18nprop =
        systemData.prop.charAt(0).toUpperCase() + systemData.prop.slice(1);
      systemData.propname = game.i18n.localize(`SW25.Item.${i18nprop}`);
    } else systemData.propname = "-";

    if (systemData.mincost == null) systemData.mincost = 0;
    if (systemData.maxcost == null) systemData.maxcost = 0;
  }

  _prepareTacticsData(itemData) {
    if (itemData.type !== "tactics") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(`SW25.Item.Tactics.${i18ntype}`);
    } else systemData.typename = "-";

    if (systemData.line != "-") {
      const i18nline =
        systemData.line.charAt(0).toUpperCase() + systemData.line.slice(1);
      systemData.linename = game.i18n.localize(`SW25.Item.Tactics.${i18nline}`);
    } else systemData.linename = "-";
  }

  _prepareOtherFeatureData(itemData) {}
  _prepareRaceabilityData(itemData) {}
  _prepareLanguageData(itemData) {}

  _prepareSpellData(itemData) {
    if (itemData.type !== "spell") return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
    const actorData = itemData.actor.system;
    const actoritemData = itemData.actor.items;

    if (systemData.type != "-") {
      const i18ntype =
        systemData.type.charAt(0).toUpperCase() + systemData.type.slice(1);
      systemData.typename = game.i18n.localize(`SW25.Item.Spell.${i18ntype}`);
    } else systemData.typename = "-";

    if (systemData.resist != "-") {
      const i18nresist =
        systemData.resist.charAt(0).toUpperCase() + systemData.resist.slice(1);
      systemData.resistname = game.i18n.localize(`SW25.Item.${i18nresist}`);
    } else systemData.resistname = "-";

    if (systemData.prop != "-") {
      const i18nprop =
        systemData.prop.charAt(0).toUpperCase() + systemData.prop.slice(1);
      systemData.propname = game.i18n.localize(`SW25.Item.${i18nprop}`);
    } else systemData.propname = "-";

    if (systemData.fairytype != "-") {
      const i18nfairytype =
        systemData.fairytype.charAt(0).toUpperCase() +
        systemData.fairytype.slice(1);
      systemData.fairytypename = game.i18n.localize(
        `SW25.Item.Spell.${i18nfairytype}`
      );
    } else systemData.fairytypename = "-";

    if (systemData.fairyprop != "-") {
      const i18nfairyprop =
        systemData.fairyprop.charAt(0).toUpperCase() +
        systemData.fairyprop.slice(1);
      systemData.fairypropname = game.i18n.localize(
        `SW25.Item.Spell.${i18nfairyprop}`
      );
    } else systemData.fairypropname = "-";

    // Set default skill and ability
    if (systemData.type == "sorcerer") {
      if (actorData.scskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.scskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.scskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "conjurer") {
      if (actorData.cnskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.cnskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.cnskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "wizard") {
      if (actorData.wzskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.wzskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.wzskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "priest") {
      if (actorData.prskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.prskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.prskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "magitech") {
      if (actorData.mtskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.mtskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.mtskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "fairy") {
      if (actorData.frskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.frskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.frskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "druid") {
      if (actorData.drskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.drskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.drskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
    if (systemData.type == "daemon") {
      if (actorData.dmskill != "-") {
        if (systemData.checkskill == "-")
          systemData.checkskill = actorData.dmskill;
        if (systemData.checkabi == "-") systemData.checkabi = "int";
        if (systemData.powerskill == "-")
          systemData.powerskill = actorData.dmskill;
        if (systemData.powerabi == "-") systemData.powerabi = "int";
      }
    }
  }

  _prepareMonsterabilityData(itemData) {}

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const rollData = { ...super.getRollData() };

    // Quit early if there's no parent actor
    if (!this.actor) return rollData;

    // If present, add the actor's roll data
    rollData.actor = this.actor.getRollData();

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get("core", "rollMode");
    const usedice = item.system.usedice;
    const usedice1 = item.system.usedice1;
    const usedice2 = item.system.usedice2;
    const usedice3 = item.system.usedice3;
    const label0 = game.i18n.localize("SW25.Check");
    const label1 = item.system.label1;
    const label2 = item.system.label2;
    const label3 = item.system.label3;
    const labelmonpow = item.system.labelmonpow;
    const usepower = item.system.usepower;
    const useeffect = item.system.useeffect;
    let label = `${item.name}`;
    let powlabel = game.i18n.localize("SW25.Item.Power");
    let spell = false;
    if (item.type == "spell") spell = true;
    let enhancearts = false;
    if (item.type == "enhancearts") spell = true;

    if (this.system.clickitem == "dice") label = label + " (" + label0 + ")";
    if (this.system.clickitem == "dice1") label = label + " (" + label1 + ")";
    if (this.system.clickitem == "dice2") label = label + " (" + label2 + ")";
    if (this.system.clickitem == "dice3") label = label + " (" + label3 + ")";
    if (this.type == "monsterability") powlabel = labelmonpow;
    if (this.system.clickitem == "power") label = label + " (" + powlabel + ")";

    if (this.system.clickitem == "all") {
      let chatData = {
        speaker: speaker,
        flavor: label,
        rollMode: rollMode,
      };

      let chatDescription = item.system.description;

      chatData.content = await renderTemplate(
        "systems/sw25/templates/roll/roll-item.hbs",
        {
          description: chatDescription,
          spell: spell,
          enhancearts: enhancearts,
          usedice: usedice,
          usedice1: usedice1,
          usedice2: usedice2,
          usedice3: usedice3,
          label0: label0,
          label1: label1,
          label2: label2,
          label3: label3,
          usepower: usepower,
          useeffect: useeffect,
          powlabel: powlabel,
        }
      );

      chatData.flags = {
        itemid: item._id,
      };

      ChatMessage.create(chatData);
    }

    if (
      this.system.clickitem == "dice" ||
      this.system.clickitem == "dice1" ||
      this.system.clickitem == "dice2" ||
      this.system.clickitem == "dice3"
    ) {
      const rollData = this.getRollData();
      let formula = this.system.formula + "+" + this.system.checkbase;

      let roll = new Roll(formula, rollData);
      await roll.evaluate();

      let chatData = {
        speaker: speaker,
        flavor: label,
        rollMode: rollMode,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        rolls: [roll],
      };

      let chatapply = "-";
      if (this.system.clickitem == "dice") chatapply = this.system.applycheck;
      if (this.system.clickitem == "dice1") chatapply = this.system.applycheck1;
      if (this.system.clickitem == "dice2") chatapply = this.system.applycheck2;
      if (this.system.clickitem == "dice3") chatapply = this.system.applycheck3;

      let chatFormula = roll.formula;
      let chatCritical = null;
      let chatFumble = null;
      let chatTotal = roll.total;
      if (roll.terms[0].total == 12) chatCritical = 1;
      if (roll.terms[0].total == 2) chatFumble = 1;

      chatData.flags = {
        total: chatTotal,
        apply: chatapply,
      };

      chatData.content = await renderTemplate(
        "systems/sw25/templates/roll/roll-check.hbs",
        {
          formula: chatFormula,
          tooltip: await roll.getTooltip(),
          critical: chatCritical,
          fumble: chatFumble,
          total: chatTotal,
          apply: chatapply,
        }
      );

      ChatMessage.create(chatData);

      return roll;
    }

    if (this.system.clickitem == "power") {
      const formula = this.system.formula;
      const powertable = this.system.powertable;

      let roll = await powerRoll(formula, powertable);

      let cValueFormula = "@" + roll.cValue;
      let halfFormula = "";
      let lethalTechFormula = "";
      let criticalRayFormula = "";
      let pharmToolFormula = "";
      let powupFormula = "";
      if (roll.cValue == 100) cValueFormula = "@13";
      if (roll.halfPow == 1) halfFormula = "h+" + roll.halfPowMod;
      if (roll.lethalTech != 0) lethalTechFormula = "#" + roll.lethalTech;
      if (roll.criticalRay > 0) criticalRayFormula = "$+" + roll.criticalRay;
      else if (roll.criticalRay != 0)
        criticalRayFormula = "$" + roll.criticalRay;
      if (roll.pharmTool != 0) pharmToolFormula = "tf" + roll.pharmTool;
      if (roll.powup != 0) powupFormula = "r" + roll.powup;

      let chatFormula =
        "k" +
        roll.power +
        cValueFormula +
        "+" +
        roll.powMod +
        lethalTechFormula +
        criticalRayFormula +
        pharmToolFormula +
        powupFormula +
        halfFormula;

      let chatPower = roll.power;
      let chatLethalTech = null;
      let chatCriticalRay = null;
      let chatPharmTool = null;
      let chatPowup = null;
      let chatResult = roll.eachPowerResult;
      let chatMod = roll.powMod;
      let chatHalf = null;
      let chatResults = roll.rawPowerResult;
      let chatTotal = roll.powerResult;
      let chatExtraRoll = null;
      let chatFumble = null;
      if (roll.halfPow == 1) chatHalf = roll.halfPowMod;
      if (roll.lethalTech != 0) chatLethalTech = roll.lethalTech;
      if (roll.criticalRay != 0) chatCriticalRay = roll.criticalRay;
      if (roll.pharmTool != 0) chatPharmTool = roll.pharmTool;
      if (roll.powup != 0) chatPowup = roll.powup;
      if (roll.rollCount > 0) chatExtraRoll = roll.rollCount;
      if (roll.fumble == 1) chatFumble = roll.fumble;

      let chatData = {
        speaker: speaker,
        flavor: label,
        rollMode: rollMode,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        rolls: [roll.fakeResult],
      };

      let showhalf = true;
      let shownoc = true;
      if (roll.halfPow == 1) {
        showhalf = false;
        shownoc = false;
      }
      if (roll.cValue == 100 || chatExtraRoll == null) shownoc = false;
      let chatapply = this.system.applypower;

      chatData.flags = {
        formula: chatFormula,
        tooltip: await roll.fakeResult.getTooltip(),
        power: chatPower,
        lethalTech: chatLethalTech,
        criticalRay: chatCriticalRay,
        pharmTool: chatPharmTool,
        powup: chatPowup,
        result: chatResult,
        mod: chatMod,
        half: chatHalf,
        results: chatResults,
        total: chatTotal,
        extraRoll: chatExtraRoll,
        fumble: chatFumble,
        orghalf: roll.halfPowMod,
        orgtotal: chatTotal,
        orgextraRoll: chatExtraRoll,
        showhalf: showhalf,
        shownoc: shownoc,
        apply: chatapply,
      };

      chatData.content = await renderTemplate(
        "systems/sw25/templates/roll/roll-power.hbs",
        {
          formula: chatFormula,
          tooltip: await roll.fakeResult.getTooltip(),
          power: chatPower,
          lethalTech: chatLethalTech,
          criticalRay: chatCriticalRay,
          pharmTool: chatPharmTool,
          powup: chatPowup,
          result: chatResult,
          mod: chatMod,
          half: chatHalf,
          results: chatResults,
          total: chatTotal,
          extraRoll: chatExtraRoll,
          fumble: chatFumble,
          showhalf: showhalf,
          shownoc: shownoc,
          apply: chatapply,
        }
      );

      ChatMessage.create(chatData);

      return roll;
    }

    if (this.system.clickitem == "mpcost") {
      const selectedTokens = canvas.tokens.controlled;
      if (selectedTokens.length === 0) {
        ui.notifications.warn(game.i18n.localize("SW25.Noselectwarn"));
        return;
      } else if (selectedTokens.length > 1) {
        ui.notifications.warn(game.i18n.localize("SW25.Multiselectwarn"));
        return;
      }
      const token = selectedTokens[0];
      const cost = item.system.mpcost;
      const name = item.name;
      const type = item.type;
      const meta = 1;
      mpCost(token, cost, name, type, meta);
    }

    if (this.system.clickitem == "description" || !this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        flavor: label,
        rollMode: rollMode,
        content: item.system.description ?? "",
      });
    }
  }
}
