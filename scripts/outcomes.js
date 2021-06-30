// Solution possible outcomes
export const branches = {
    // B = balance | N = no balance
  
    // Balancing first page
    B: {
      title: "1<sup>st</sup> Move Balanced",
      instructions: "<p>The oddly weighted villager must be 9, 10, 11, or 12.</p><p>Weigh 1, 2, 3 against 9, 10, 11, keeping 12 aside.</p>",
      img: "b.png",
      pageNo: 2,
      last: false,
  
      B: {
        title: "2<sup>nd</sup> Move Balanced",
        instructions: "<p>The oddly weighted villager must be villager 12 - the only one we haven't weighed</p><p>Weigh 12 against any other villager to know if it is heavier or lighter",
        img: "bb.png",
        pageNo: 3,
        last: true
      },
  
      N: {
        title: "2<sup>nd</sup> Move Didn't balance",
        instructions: "<p>The oddly weighted villager is one of the three we added to the seesaw in the last step (9, 10, 11)</p><p>They are heavier or lighter depending on which way the seesaw tilted in the last weighing.<p>Weigh 9 against 10, keeping 11 aside</p>",
        img: "bn.png",
        pageNo: 3,
        last: false,
  
        B: {
          title: "3<sup>rd</sup> Move Balanced",
          instructions: "<p>11 - which we had set aside - must be oddly weighted</p><p>Villager 11 is heavier or lighter depending on which way it tilted the seesaw in the 1<sup>st</sup> move</p>",
          img: "",
          pageNo: 4,
          last: true
        },
  
        N: {
          title: "3<sup>rd</sup> Move Didn't balance",
          instructions: "<p>If the seesaw tilted in the opposite direction this time, it must be the villager we moved to the left side (9)</p><p>Otherwise, it must be the villager that remained on the right (10)</p>",
          img: "",
          pageNo: 4,
          last: true
        }
      }
    },
    // Not balancing first page
    N: {
      title: "1<sup>st</sup> Move Didn't balance",
      instructions: "<p>The oddly weighted villager must be on the seesaw (1-8).</p><p>Set 7 and 8 aside.<br>Weigh 1, 2, 5 against 3, 4, 6.</p>",
      img: "n.png",
      pageNo: 2,
      last: false,
  
      B: {
        title: "2<sup>nd</sup> Move Balanced",
        instructions: "<p>The oddly weighted villager must be one of the two we set aside (7-8)</p><p>Weigh any balancing villager (1-6, 9-12) against 7</p>",
        img: "nb.png",
        pageNo: 3,
        last: false,
        
        B: {
          title: "3<sup>rd</sup> Move Balanced",
          instructions: "<p>Villager 8 must be oddly weighted.</p><p>8 will be heavier or lighter depending on whether the right side was heavier or lighter in the 1<sup>st</sup> weighing",
          img: "",
          pageNo: 4,
          last: true
        },
  
        N: {
          title: "3<sup>rd</sup> Move Didn't Balance",
          instructions: "<p>Villager 7 must be oddly weighted</p><p>7 will heavier or lighter depending on the results of this weighing</p>",
          img: "",
          pageNo: 4,
          last: true
        }
      },
      
      N: {
        title: "2<sup>nd</sup> Move Didn't Balance",
        instructions: "<p>If the heavier side stayed the same, it must be 1, 2, or 6 - which did not move between weighings</p><p>Set villager 6 aside<br>Weigh 1 against 2.</p>",
        img: "nn.png",
        pageNo: 3,
        last: false,
        
        B: {
          title: "3<sup>rd</sup> Move Balance",
          instructions: "<p>Villager 6 must be oddly weighted</p><p>6 will be heavier or lighter depending on which way the seesaw leaned in the last weighing</p>",
          img: "",
          pageNo: 4,
          last: true
        },
        N: {
          title: "3<sup>rd</sup> Move Didn't Balance",
          instructions: "<p>If the left side was heavier in the 1<sup>st</sup> move, then we know that the target villager is heavier</p><p>Therefore, 1 or 2 would be the target depending on which weighs the seesaw down</p>",
          img: "",
          pageNo: 4,
          last: true
        }
      }
    }
  };