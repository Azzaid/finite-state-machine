class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.currentState = config.initial;
        this.states = config.states;
        this.tranzitionHistoryBack = [];
        this.tranzitionHistoryForce = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return(this.currentState);
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.config.states) {
            this.tranzitionHistoryBack.push(this.currentState);
            this.tranzitionHistoryForce = [];
            this.currentState = state;
        } else {
            throw new Error("No such state") ;
        }
        return(this);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.currentState].transitions) {
            this.tranzitionHistoryBack.push(this.currentState);
            this.tranzitionHistoryForce = [];
            this.currentState = this.config.states[this.currentState].transitions[event];
        } else {
            throw new Error("No such event") ;
        }
        return(this);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
        return(this);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event != undefined) {
            var statelist = [];
            for (var state in this.config.states) {
                if (event in this.config.states[state].transitions) {
                    statelist.push(state);
                }
            }
            return(statelist);
        } else {
            return(Object.keys(this.config.states));
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.tranzitionHistoryBack.length == 0) {
            console.log("nope!B");
            return(false);
        } else {
            console.log("gogoB");
            console.log(this.tranzitionHistoryBack);
            this.tranzitionHistoryForce.push(this.currentState);
            this.currentState = this.tranzitionHistoryBack[this.tranzitionHistoryBack.length - 1];
            this.tranzitionHistoryBack.splice(this.tranzitionHistoryBack.length - 1, 1);
            return(true);
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.tranzitionHistoryForce.length == 0) {
            console.log("nope!F");
            return(false);
        } else {
            console.log("gogoF");
            console.log(this.tranzitionHistoryForce);
            this.tranzitionHistoryBack.push(this.currentState);
            this.currentState = this.tranzitionHistoryForce[this.tranzitionHistoryForce.length - 1];
            this.tranzitionHistoryForce.splice(this.tranzitionHistoryForce.length - 1, 1);
            return(true);
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.tranzitionHistoryBack = [];
        this.tranzitionHistoryForce = [];
        return(this);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
