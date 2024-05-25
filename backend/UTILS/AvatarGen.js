const boy = [
    "https://avatar.iran.liara.run/public/boy?username=Scott",
    "https://avatar.iran.liara.run/public/boy?username=James",
    "https://avatar.iran.liara.run/public/boy?username=Noah",
    "https://avatar.iran.liara.run/public/boy?username=William",
    "https://avatar.iran.liara.run/public/boy?username=Benjamin",
    "https://avatar.iran.liara.run/public/boy?username=Lucas",
    "https://avatar.iran.liara.run/public/boy?username=Daniel",
    "https://avatar.iran.liara.run/public/boy?username=Michael",
    "https://avatar.iran.liara.run/public/boy?username=Mason",
    "https://avatar.iran.liara.run/public/boy?username=Alexander",
]

const girl  = [
    "https://avatar.iran.liara.run/public/girl?username=Maria",
    "https://avatar.iran.liara.run/public/girl?username=Emma",
    "https://avatar.iran.liara.run/public/girl?username=Olivia",
    "https://avatar.iran.liara.run/public/girl?username=Sarah",
    "https://avatar.iran.liara.run/public/girl?username=Mia",
    "https://avatar.iran.liara.run/public/girl?username=Olivia",
    "https://avatar.iran.liara.run/public/girl?username=Abigail",
    "https://avatar.iran.liara.run/public/girl?username=Chloe",
    "https://avatar.iran.liara.run/public/girl?username=Natalie",
    "https://avatar.iran.liara.run/public/girl?username=Madison",
]

const AvatarGenerator = (gender)=>{
    if(gender==="male")
        return boy[Math.floor(Math.random()*boy.length)]
    return girl[Math.floor(Math.random()*girl.length)];
}

module.exports =AvatarGenerator;