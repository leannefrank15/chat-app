
export function getNameInitials(name) {
  
  const splitName = name.toUpperCase().split(' ');

  if(splitName.length > 1){ //leanne frank so length will be 2. if length is 1, it means only first name is displayed
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];

}