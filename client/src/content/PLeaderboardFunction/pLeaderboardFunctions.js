function formatMongoData(mongoData){
    return [
      { week: 1, 
        question: 1,
        part: "A",
        score: mongoData.week1q1[0]
      },
      { week: 1, 
        question: 1,
        part: "B",
        score: mongoData.week1q1[1]
      },
      { week: 1, 
        question: 1,
        part: "C",
        score: mongoData.week1q1[2]
      },
      { week: 1, 
        question: 1,
        part: "D",
        score: mongoData.week1q1[3]
      },
      { week: 1, 
        question: 2,
        part: "A",
        score: mongoData.week1q2[0]
      },
      { week: 1, 
        question: 2,
        part: "B",
        score: mongoData.week1q2[1]
      },
      { week: 1, 
        question: 2,
        part: "C",
        score: mongoData.week1q2[2]
      },
      { week: 1, 
        question: 3,
        part: "A",
        score: mongoData.week1q3[0]
      },
      { week: 1, 
        question: 3,
        part: "B",
        score: mongoData.week1q3[1]
      },
      { week: 1, 
        question: 3,
        part: "C",
        score: mongoData.week1q3[2]
      },
      { week: 2, 
        question: 1,
        part: "A",
        score: mongoData.week2q1[0]
      },
      { week: 2, 
        question: 1,
        part: "B",
        score: mongoData.week2q1[1]
      },
      { week: 2, 
        question: 1,
        part: "C",
        score: mongoData.week2q1[2]
      },
      { week: 2, 
        question: 1,
        part: "D",
        score: mongoData.week2q1[3]
      },
      { week: 2, 
        question: 1,
        part: "E",
        score: mongoData.week2q1[4]
      },
      { week: 2, 
        question: 2,
        part: "A",
        score: mongoData.week2q2[0]
      },
      { week: 2, 
        question: 2,
        part: "B",
        score: mongoData.week2q2[1]
      },
      { week: 2, 
        question: 2,
        part: "C",
        score: mongoData.week2q2[2]
      },
      { week: 2, 
        question: 3,
        part: "A",
        score: mongoData.week2q3[0]
      },
      { week: 2, 
        question: 3,
        part: "B",
        score: mongoData.week2q3[1]
      },
      { week: 2, 
        question: 3,
        part: "C",
        score: mongoData.week2q3[2]
      },
      { week: 2, 
        question: 3,
        part: "D",
        score: mongoData.week2q3[3]
      },
      { week: 3, 
        question: 1,
        part: "A",
        score: mongoData.week3q1[0]
      },
      { week: 3, 
        question: 1,
        part: "B",
        score: mongoData.week3q1[1]
      },
      { week: 3, 
        question: 1,
        part: "C",
        score: mongoData.week3q1[2]
      },
      { week: 3, 
        question: 2,
        part: "A",
        score: mongoData.week3q2[0]
      },
      { week: 3, 
        question: 2,
        part: "B",
        score: mongoData.week3q2[1]
      },
      { week: 3, 
        question: 2,
        part: "C",
        score: mongoData.week3q2[2]
      },
      { week: 3, 
        question: 3,
        part: "A",
        score: mongoData.week3q3[0]
      },
      { week: 3, 
        question: 3,
        part: "B",
        score: mongoData.week3q3[1]
      },
      { week: 3, 
        question: 3,
        part: "C",
        score: mongoData.week3q3[2]
      },
      { week: 4, 
        question: 1,
        part: "A",
        score: mongoData.week4q1[0]
      },
      { week: 4, 
        question: 1,
        part: "B",
        score: mongoData.week4q1[1]
      },
      { week: 4, 
        question: 1,
        part: "C",
        score: mongoData.week4q1[2]
      },
      { week: 4, 
        question: 2,
        part: "A",
        score: mongoData.week4q2[0]
      },
      { week: 4, 
        question: 2,
        part: "B",
        score: mongoData.week4q2[1]
      },
      { week: 4, 
        question: 2,
        part: "C",
        score: mongoData.week4q2[2]
      },
      { week: 4, 
        question: 3,
        part: "A",
        score: mongoData.week4q3[0]
      },
    ];
  }

  function formatMongoDataSub (mongoData) { 
    return {
      weeks: [
        {
          week: 1,
          questions: [
            {
              question: 1,
              parts: [
                {
                  part: "A",

                }
              ]
            },

          ]
        },
        {
          week: 2,
          questions: []
        },
        {
          week: 3,
          questions: []
        },
        {
          week: 4,
          questions: []
        }
      ]
    }
  }

export { formatMongoData , formatMongoDataSub }; 