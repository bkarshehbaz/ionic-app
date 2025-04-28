// import { levels, Logger } from "../util/logger";

// // should show numbers 1 to 17 and never show "---- ERROR"
// const log = Logger.get("first"); // do all levels work
// log.log("1");
// // log.debug("2");
// log.info("3");
// log.warn("4");
// log.error("5");
// // log(÷"6");
// log.level(levels.INFO); // do all levels work after a level change

// const log2 = Logger.get("second").level(levels.WARN); // and when a second logger is in the mix ?
// log.log("7");
// // log.debug("---- ERROR");
// log2.log("8");
// // log2.debug("---- ERROR");
// log2.info("---- ERROR");
// log.info("9");
// log.warn("10");
// log.error("11");
// // log("12");
// log2.warn("13");
// log2.error("14");
// // log2("15");

// const log3 = Logger.get("first"); // do we get the cached logger with its config?
// // log.debug("---- ERROR");
// log.error("16");
// // log("17");
