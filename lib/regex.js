import vm from "node:vm";

export default function safeMatch(str, regex, timeout = 1000) {
  const context = {
    str,
    re: regex,
    result: null,
  };

  try {
    vm.createContext(context);

    vm.runInContext("result = !!str.match(re);", context, { timeout });
  } catch (error) {
    console.warn(
      `Warning: regex ${regex} was detected as evil when tested against "${str}". Ignoring this pattern.`,
    );
    return null;
  }

  return context.result;
}
