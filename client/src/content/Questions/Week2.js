export default {
    
    WeekNumber: "2",
    Theme: "Math",
    Problems: [
        {
        Title: "Bendy Functions",
        Parts: [
            {
                part: "A",
                problemDescription: `Given a quadratic in vertex form (you know h and k in form y = a(x-h)<sup>2</sup>+k), output the coefficients in standard form. `,
                points: 1,
                inputSpecification: `The single line of input contains integers a, h, and k, describing the vertex form of the quadratic.`,
                outputSpecification: `Output a, b, and c as space-separated integers on a single line.`,
                sampleInput: ["1 5 -2"],
                sampleOutput: ["1 -10 23"]
            }, 
            {
                part: "B",
                problemDescription: `Given the coefficients of a quadratic equation, find the number of solutions.`,
                points: 1,
                inputSpecification: `The single line of input contains integers a, b, c, the coefficients of the quadratic.`,
                outputSpecification: `Output the number of roots of the quadratic - 0, 1, or 2.`,
                sampleInput: ["1 -10 23"],
                sampleOutput: ["2"]
            }, 
            {
                part: "C",
                problemDescription: `Given a quadratic in factored form, output the coefficients in standard form.`,
                points: 2,
                inputSpecification: `The single line of input contains integers a, b, c, d the coefficients of the quadratic in the form y = (ax + b)(cx + d).`,
                outputSpecification: `Output the a, b, c as space-separated integers on a single line.`,
                sampleInput: ["1 5 2 -6"],
                sampleOutput: ["2 4 -30"]
            }, 
            {
                part: "D",
                problemDescription: `Given a quadratic in vertex form, say how many roots it has.`,
                points: 3,
                inputSpecification: `The single line of input contains integers a, h, k, the values of the quadratic in the form y = a(x - h)<sup>2</sup> + k.`,
                outputSpecification: `Output 0, 1, or 2, the number of roots of the quadratic.`,
                sampleInput: ["1 5 -2"],
                sampleOutput: ["2"]
            }, 
            {
                part: "E",
                problemDescription: `Given the roots of a quadratic and the leading coefficient in standard form, output its vertex.`,
                points: 3,
                inputSpecification: `The single line of input contains integers a, r1</sub>, and r2</sub>, the leading coefficient of the equation in standard form (y = ax2 + bx + c) and the two roots in factored form (y = (x - r1</sub>)(x - r2</sub>))`,
                outputSpecification: `Output a, h, k, the values of the quadratic in vertex form, where y=a(x-h)<sup>2</sup>+k`,
                sampleInput: ["1 3 5"],
                sampleOutput: ["1 -4 -1"]
            },
        ],
      },
      {
        Title: "What's the Point?",
        Parts: [
            {
                part: "A",
                problemDescription: `Given P1</sub>(x1</sub>, y1</sub>) and P2</sub>(x2</sub>, y2</sub>), find the distance between the two points.`,
                points: 5,
                inputSpecification: `The first line of input contains space-separated integers x1</sub> and y1</sub>. The second line of input contains space-separated integers x2</sub> and y2</sub>.`,
                outputSpecification: "Output the distance between the two points rounded to exactly one decimal place.",
                sampleInput: ["0 0 1 1"],
                sampleOutput: ["1.4"]
            }, 
            {
                part: "B",
                problemDescription: `Two hikers moving at the same speed race on the side of a mountain. Who will make it to a predetermined spot first?
                (the terrain can be modeled as a Cartesian grid with the top of the mountain as 0, 0).
                `,
                points: 2,
                inputSpecification: `The first line of input contains hiker A’s coordinates, xa</sub> and ya</sub>. The second line of input contains hiker B’s starting coordinates, xb</sub> and yb</sub>. The final line contains the target coordinates, xt</sub> and yt</sub>.`,
                outputSpecification: `Output “A” if team A will reach the spot first and “B” if team B will reach the spot first.`,
                sampleInput: ["0 0", "5 5", "1 1"],
                sampleOutput: ["A"]
            }, 
            {
                part: "C",
                problemDescription: `Two hikers moving at different speeds race on the side of a mountain. Who will make it to a predetermined spot first?
                (the terrain can be modeled as a Cartesian grid with the top of the mountain as 0, 0).
                `,
                points: 3,
                outputSpecification: `The first line of input contains hiker A’s coordinates, xa</sub> and ya</sub>, and their speed va</sub>. The second line of input contains the second hiker’s coordinates, xb</sub> and yb</sub>, and their speed. vb</sub> The final line contains the target coordinates, xt</sub> and yt</sub>.`,
                outputSpecifcation: `Output “A” if team a will reach the spot first and “B” if team B will reach the spot first.`,
                sampleInput: ["0 0 1", "5 5 7", "1 1"],
                sampleOutput: ["B"]
            },
        ],
      },
      {
        Title: "Hey, I wanted to go there!",
        Parts: [
            {
                part: "A",
                problemDescription: `Given a board and a command (“Block” or “Win”). 
                
                <br><br>

                Output the board with your move. There will always be at least one possible move. If there is more than one possible move, any of the possible moves will be accepted. 

                Output the coordinates of the move. You play as X and your opponent plays as O. Note: the board may not always represent a possible position in the standard game of tic tac toe.
                `,
                points: 1,
                inputSpecification: `The first line of input contains the first row of the board. The second line of input contains the second row of the board. The third line of input contains the third row of the board. In each row, ‘x’ = X, ‘o’ = O, ‘.’ = blank
                The final line of input contains the command “B” or “W” (Block or Win).
                `,
                outputSpecification: `Output each row of the board on three separate lines after your move. On the final line, output the coordinates of the move in the format row column, where the top left corner is (1, 1)`,
                sampleInput: [".xo", ".xo", "...", "B"],
                sampleOutput: [".xo", ".xo", ".x", "3 3"]
            }, 
            {
                part: "B",
                problemDescription: `Given a board, output the coordinates of your best possible move (winning takes priority of blocking, which takes priority over moving to set up a win).`,
                points: 1,
                inputSpecification: `The first line of input contains the first row of the board. The second line of input contains the second row of the board. The third line of input contains the third row of the board. `,
                outputSpecification: `Output the coordinates of the best move.`,
                sampleInput: [".xo", ".xo", "..."],
                sampleOutput: ["2 3"]
            }, 
            {
                part: "C",
                problemDescription: `Given a board, output whether you will win or lose (depth 2 max) `,
                points: 2,
                inputSpecification: `The first line of input contains the first row of the board. The second line of input contains the second row of the board. The third line of input contains the third row of the board. `,
                outputSpecification: `Output “win” if you will win and “lose” if you will lose. There will always be a forced win or loss.`,
                sampleInput: [".xo", ".xo", "..."],
                sampleOutput: ["win"]
            },
            {
                part: "D",
                problemDescription: `Given a board, play a game! You will get points based on your tie% (unfortunately the test cases are perfect and you will never win) [max 5]`,
                points: 5,
                inputSpecification: `This is an interactive problem. You will play first. The program with which you are interacting will output coordinates in the form row column to represent their moves. Flush input.
                Exit your program after your fifth move (or earlier if you have already won).
                If -1 -1 is outputted, your input was invalid. Please exit your program.
                `,
                outputSpecification: `Output your moves in the format row column.`,
                sampleInput: [`>>> 1 1 <br> 2 2`, `>>> 3 3 <br> 2 3`, `>>> 2 1 <br> 3 1`, `>>> 1 3 <br> 1 2`, `>>> 1 2 <br> 3 2`],
                sampleOutput: ["xxo", "oox", "xox"]
            }
        ]
      }
    ]
};