import React from 'react';
import { connect } from 'react-redux';
import { submitInput } from '../redux/actions/input';

const ChallengeForm = ({challenge, answer, specialChar, handleSubmit}) => {
    return (
        <form className="regex-input" onSubmit={(e) => handleSubmit(e, challenge, answer, specialChar)}>
            <input type="text" placeholder="Type expressions here" />
        </form>
    );
}

const shakeIcons = () => {
    const iconList = document.querySelectorAll(".challenge-icon")
               
    iconList.forEach( icon => {
        icon.classList.add("shake")
        setTimeout(() => icon.classList.remove("shake"), 500);
    })     
}


const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (e, challenge, answer, specialChar) => {
        e.preventDefault()

        const userInput = e.target.firstChild.value
        if (!userInput.includes("/")) {
            shakeIcons()
        } else {
            //splits user input into expression and flags
            const expression = userInput.split("/") 
            const regex = new RegExp(expression[1],expression[2]) 
            //checks if the regex produced by the userInput would match the correct chars
            const result = challenge.match(regex) 
            const bool = result ? result.join() === answer.join() : false 
            // console.log('result:', result.join(), 'answer:', answer.join())
            
            if (bool) {
                if (answer.length === 1) {
                    const str = answer.join()
                    //handles special characters that cant be written as a file name like "!"
                    for (let i = 0; i < str.length; i++) {
                        let y = str.charAt(i) === specialChar[0] ? specialChar[1] : str.charAt(i)
                        document.querySelector(`.char-${y}`).className = "challenge-icon animated flipOutX"
                    } 
                } else {
                    answer.forEach( 
                        x => {
                            if (x.length > 1) {
                                for (let i = 0; i < x.length; i++) {
                                    document.querySelector(`.char-${x.charAt(i)}`).className = "challenge-icon animated flipOutX"
                                } 
                            } else {
                                document.querySelector(`.char-${x}`).className = "challenge-icon animated flipOutX"
                            }
                        }
                    )
                }
                
                setTimeout(() => dispatch(submitInput(bool)), 700);
            } else {
                shakeIcons()
            }
        } 
    }
})

export default connect(null, mapDispatchToProps)(ChallengeForm);
