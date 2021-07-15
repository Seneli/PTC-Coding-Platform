import React from "react";

const PLDropdownRows = (props) => {
    return (
        <tbody>
          {props.data.map((question, index) => (
            <tr key={index}>
              <td>{question.week}</td>
              <td>{question.question}</td>
              <td>{`Part ${question.part}`}</td>
              <td>{question.score}</td>
            </tr>
          ))}
        </tbody>
    );
}

export default PLDropdownRows;