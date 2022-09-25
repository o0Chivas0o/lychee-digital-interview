export const LoginSchema = {
  username:{
    presence:{
      allowEmpty: false,
      message:'^用户名不得为空'
    },
    format:{
      pattern:`^[A-Za-z\\d]{4,16}$`,
      message:"^仅允许包含数字或大小写字母，长度为4~16"
    }
  },
  password:{
    presence:{
      allowEmpty: false,
      message:'^密码不得为空'
    },
    format:{
      pattern:`^[A-Za-z\\d@$!%*#?&]{8,32}$`,
      message:'^仅允许数字，大小写字母，以及标点符号，长度为8~32'
    }
  },
}
