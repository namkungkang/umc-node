export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      age:body.age,
      birth:birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phone_num: body.phone_num,
      preferences: body.preferences || [],
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
      (preference) => preference.foodCategory.name
    );
  
    return {
      email: user.email,
      name: user.name,
      preferCategory: preferFoods,
    };
  };