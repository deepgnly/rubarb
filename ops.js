
let endCharacters = [".", ",", "!", ")", "("]

function checkCharacter(word) {
    let modifiedWord = word
    let lastChar = word.substring(word.length - 1);
    if (endCharacters.includes(lastChar)) {
        modifiedWord = word.slice(0, -1)
    } else {
        modifiedWord = word
    }
    let firstChar = modifiedWord.charAt(0)
    if (endCharacters.includes(firstChar)) {
        modifiedWord = modifiedWord.slice(1)
    }
    return modifiedWord
}

function execute(jobDescriptionString, resumeString, excludedWords) {
    var finalJson = {}
    let jobDescList = jobDescriptionString.toLowerCase().split(/\s+/)
    let resumeList = resumeString.toLowerCase().split(/\s+/)
    let excludeList = excludedWords.toLowerCase().split(",")

    let jobDescMinusExculde = new Set()
    let resumeExclude = new Set()
    let excludeSet = new Set()

    let word, l

    for (i = 0; i < excludeList.length; i++) {
        l = excludeList[i].length
        if (l == 0) {
            continue
        }
        word = checkCharacter(excludeList[i])
        excludeSet.add(word)
    }

    for (i = 0; i < jobDescList.length; i++) {

        l = jobDescList[i].length
        if (l == 0) {
            continue
        }
        word = checkCharacter(jobDescList[i])
        if (excludeSet.has(word)) {
            continue
        }
        jobDescMinusExculde.add(word)
    }

    for (i = 0; i < resumeList.length; i++) {
        l = resumeList[i].length
        if (l == 0) {
            continue
        }
        word = checkCharacter(resumeList[i])

        if (excludeSet.has(word)) {
            continue
        }
        resumeExclude.add(word)
    }


    const intersection = new Set(
        Array.from(jobDescMinusExculde).filter(function (x) {
            if (excludeSet.has(x)) {
                return false
            } else if (resumeExclude.has(x)) {
                return true
            }
            return false
        })
    );

    const difference = new Set(
        Array.from(jobDescMinusExculde).filter(function (x) {
            if (excludeSet.has(x)) {
                return false
            } else if (!resumeExclude.has(x)) {
                return true
            }
            return false

        })
    );

    finalJson["intersection"] = Array.from(intersection)
    finalJson["difference"] = Array.from(difference)

    return finalJson
}