// This file exports the FICS command regex patterns for testing
export const ficsCommandRegex = [
    /^(examine$)|(examine [a-zA-Z0-9]+$)|(ex [a-zA-Z0-9]+$)/i,
    /^(unexamine$)|(unexamine [a-zA-Z0-9]+$)|(unex$)|(unex [a-zA-Z0-9]+$)/i,
    /^(history$)|(hi$)|(history [a-zA-Z0-9]+$)|(hi [a-zA-Z0-9]+$)/i,
    /^(finger$)|(fi$)|(finger [a-zA-Z0-9]+$)|(fi [a-zA-Z0-9]+$)/i,
    /^(match [a-zA-Z0-9]+$)|(m [a-zA-Z0-9]+$)/i,
    /^(observe$)|(obs$)|(observe [a-zA-Z0-9]+$)|(obs [a-zA-Z0-9]+$)/i,
    /^(unobserve$)|(unobs$)|(unobserve [a-zA-Z0-9]+$)|(unobs [a-zA-Z0-9]+$)/i,
    /^([+-]censor [a-zA-Z0-9]+$)/i,
    /^(seek [a-zA-Z0-9]+ [a-zA-Z0-9]+ [a-zA-Z0-9]+$)/i,
    /^(play [0-9]+$)/i,
    /^(tell [a-zA-Z0-9]+ .*$)|(tell [a-zA-Z0-9]+$)|(t [a-zA-Z0-9]+ .*$)|(t [a-zA-Z0-9]+$)/i,
    /^(kibitz [a-zA-Z0-9]+ .*$)|(kibitz [a-zA-Z0-9]+$)|(kib [a-zA-Z0-9]+ .*$)|(kib [a-zA-Z0-9]+$)/i,
    /^(whisper [a-zA-Z0-9]+ .*$)|(whisper [a-zA-Z0-9]+$)/i,
    /^(message .*$)|(messages$)/i
];
