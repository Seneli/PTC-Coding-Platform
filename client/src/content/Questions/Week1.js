export default {
  WeekNumber: "1",
  Theme: "Math",

  Problem1: {
    Title: "Back to the Basics",
    Questions: [
      {
        part: "a",
        problemDescription: "Given integers a and b, output a + b.",
        point: 2,
        inputSpecification:
          "The first line of input contains space-separated integers a and b.",
        outputSpecifcation: "Output the value of a + b on a single line",
        sampleInput: ["4 6"],
        sampleOutput: 10,
      },
      {
        part: "b",
        problemDescription: `Given n pairs of numbers (aₙ, bₙ), output aₙ + bₙ on n different lines.`,
        points: 2,
        inputSpecification:
          "The first line contains the integer n. The next n lines of input contain space-separated integers a and b.",
        outputSpecifcation: `Output n lines with the value of aₙ + bₙ on the n<sup>th</sup> line`,
        sampleInput: ["3", "4 6", "-5 3", "0 -3"],
        sampleOutput: ["10", "-2", "-3"],
      },
      {
        part: "c",
        problemDescription: `Given n pairs of numbers (aₙ, bₙ), output the greatest value of aₙ + bₙ.`,
        points: 3,
        inputSpecification:
          "The first line contains the integer n. The next n lines of input contain space-separated integers a and b.",
        outputSpecifcation: `Output the maximum value of aₙ + bₙ on a single line`,
        sampleInput: ["3", "4 6", "-5 3", "0 -3"],
        sampleOutput: 10,
      },
      {
        part: "d",
        problemDescription: `Given n pairs of numbers (aₙ, bₙ), output the second greatest value of aₙ + bₙ.`,
        points: 3,
        inputSpecification:
          "The first line contains the integer n. The next n lines of input contain space-separated integers a and b.",
        outputSpecifcation: `Output the second largest value of aₙ + bₙ on a single line`,
        sampleInput: ["3", "4 6", "-5 3", "0 -3"],
        sampleOutput: -2,
      },
    ],
  },
  Problem2: {
    Title: "Crunching Strings",
    Questions: [
      {
        part: "a",
        problemDescription: "Given int n and char c, print c n times.",
        point: 1,
        inputSpecification:
          "The single line of input contains an integer n and character c separated by a space.",
        outputSpecifcation: "Output character c n times ",
        sampleInput: ["7 d"],
        sampleOutput: "ddddddd",
      },
      {
        part: "b",
        problemDescription: `Given int n and char c (not separated by a space), print c n times.`,
        points: 3,
        inputSpecification:
          "The single line of input contains an integer n and character c, not separated by a space.",
        outputSpecifcation: `Output character c n times `,
        sampleInput: ["7d"],
        sampleOutput: "ddddddd",
      },
      {
        part: "c",
        problemDescription: `Given a non-space separated line of pairs of integers followed by characters, print each character n times. (note: the string may contain spaces, use getline or whatever the python equivalent is)
        (This is a very basic way of compressing data!)
        `,
        points: 6,
        inputSpecification:
          "The single line of input contains integer-character pairs, not separated by a space.",
        outputSpecifcation: `For each pair of an integer n and a character c, output character c n times`,
        sampleInput: "1p1r1e2t1y1l2o1p1s",
        sampleOutput: "prettyloops",
      },
    ],
  },

  Problem3: {
    Title: "Crunching Strings",
    Questions: [
      {
        part: "a",
        problemDescription:
          "Given a list of space-separated integers, output the integers in a sorted list. (hint hint nudge nudge sort())",
        point: 2,
        inputSpecification:
          "The single line of input contains space separated integers.",
        outputSpecifcation: "Print the integers in a sorted list.",
        sampleInput: ["5 2 6 8"],
        sampleOutput: [2, 5, 6, 8],
      },
      {
        part: "b",
        problemDescription: `Given the perimeter of a rectangle, maximize the area.`,
        points: 3,
        inputSpecification: "The single line of input contains one integer.",
        outputSpecifcation: `Print the maximum possible area of a rectangle with the given perimeter, rounded to exactly one decimal place.`,
        sampleInput: 25,
        sampleOutput: 39.1,
      },
      {
        part: "c",
        problemDescription: `Given two lists of space-separated integers of equal length, output a third array in which the elements are the sums of elements of the first and second array, and in which the product of all the elements is minimized.
        Every element from the first two arrays must be used in the third array exactly once
        I.e. sort both arrays and add the elements at the same index
        `,
        points: 5,
        inputSpecification:
          "The first line of input contains space-separated integers. The second line of input contains space-separated integers",
        outputSpecifcation: `Print the third array`,
        sampleInput: ["5 2 6 8", "7 2 4 3"],
        sampleOutput: [4, 8, 10, 15],
      },
    ],
  },
};
