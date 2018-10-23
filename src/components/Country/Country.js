import React from "react";
import { Picker,View} from "react-native";

const countryItem = props => (
    
    <View style={{flex:5,justifyContent: 'flex-end',alignItems:'flex-end'}}>
        <Picker 
        selectedValue={props.selectedCountry}
        style={{width: 90,height:35 }}
        onValueChange = {props.changeCountry}>
         
            <Picker.Item label= 'Afghanistan' value= 'AF' />
            <Picker.Item label= 'Åland Islands' value= 'AX' />
            <Picker.Item label= 'Albania' value= 'AL' />
            <Picker.Item label= 'Algeria' value= 'DZ' />
            <Picker.Item label= 'Argentina' value= 'AR' />
            <Picker.Item label= 'Australia' value= 'AU' />
            <Picker.Item label= 'Austria' value= 'AT' />
            <Picker.Item label= 'Bahamas' value= 'BS' />
            <Picker.Item label= 'Bahrain' value= 'BH' />
            <Picker.Item label= 'Bangladesh' value= 'BD' />
            <Picker.Item label= 'Bermuda' value= 'BM' />
            <Picker.Item label= 'Bhutan' value= 'BT' />
            <Picker.Item label= 'Brazil' value= 'BR' />
            <Picker.Item label= 'British Indian Ocean Territory' value= 'IO' />
            <Picker.Item label= 'Bulgaria' value= 'BG' />
            <Picker.Item label= 'Burkina Faso' value= 'BF' />
            <Picker.Item label= 'Burundi' value= 'BI' />
            <Picker.Item label= 'Cambodia' value= 'KH' />
            <Picker.Item label= 'Cameroon' value= 'CM' />
            <Picker.Item label= 'Canada' value= 'CA' />
            <Picker.Item label= 'Chile' value= 'CL' />
            <Picker.Item label= 'China' value= 'CN' />
            <Picker.Item label= 'Christmas Island' value= 'CX' />
            <Picker.Item label= 'Cocos (Keeling) Islands' value= 'CC' />
            <Picker.Item label= 'Colombia' value= 'CO' />
            <Picker.Item label= 'Cook Islands' value= 'CK' />
            <Picker.Item label= 'Costa Rica' value= 'CR' />
            <Picker.Item label= 'Croatia' value= 'HR' />
            <Picker.Item label= 'Cuba' value= 'CU' />
            <Picker.Item label= 'Denmark' value= 'DK' />
            <Picker.Item label= 'Egypt' value= 'EG' />
            <Picker.Item label= 'Falkland Islands (Malvinas)' value= 'FK' />
            <Picker.Item label= 'Faroe Islands' value= 'FO' />
            <Picker.Item label= 'Fiji' value= 'FJ' />
            <Picker.Item label= 'Finland' value= 'FI' />
            <Picker.Item label= 'France' value= 'FR' />
            <Picker.Item label= 'Germany' value= 'DE' />
            <Picker.Item label= 'Ghana' value= 'GH' />
            <Picker.Item label= 'Hong Kong' value= 'HK' />
            <Picker.Item label= 'Hungary' value= 'HU' />
            <Picker.Item label= 'Iceland' value= 'IS' />
            <Picker.Item label= 'India' value= 'IN' />
            <Picker.Item label= 'Indonesia' value= 'ID' />
            <Picker.Item label= 'Iraq' value= 'IQ' />
            <Picker.Item label= 'Ireland' value= 'IE' />
            <Picker.Item label= 'Israel' value= 'IL' />
            <Picker.Item label= 'Italy' value= 'IT' />
            <Picker.Item label= 'Japan' value= 'JP' />
            <Picker.Item label= 'Jersey' value= 'JE' />
            <Picker.Item label= 'Jordan' value= 'JO' />
            <Picker.Item label= 'Kenya' value= 'KE' />
            <Picker.Item label= 'Korea, Republic of' value= 'KR' />
            <Picker.Item label= 'Kuwait' value= 'KW' />
            <Picker.Item label= 'Macao' value= 'MO' />
            <Picker.Item label= 'Malaysia' value= 'MY' />
            <Picker.Item label= 'Maldives' value= 'MV' />
            <Picker.Item label= 'Mexico' value= 'MX' />
            <Picker.Item label= 'Mongolia' value= 'MN' />
            <Picker.Item label= 'Morocco' value= 'MA' />
            <Picker.Item label= 'Mozambique' value= 'MZ' />
            <Picker.Item label= 'Myanmar' value= 'MM' />
            <Picker.Item label= 'Nepal' value= 'NP' />
            <Picker.Item label= 'Netherlands' value= 'NL' />
            <Picker.Item label= 'New Zealand' value= 'NZ' />
            <Picker.Item label= 'Nigeria' value= 'NG' />
            <Picker.Item label= 'Norway' value= 'NO' />
            <Picker.Item label= 'Oman' value= 'OM' />
            <Picker.Item label= 'Pakistan' value= 'PK' />
            <Picker.Item label= 'Palau' value= 'PW' />
            <Picker.Item label= 'Palestinian Territory, Occupied' value= 'PS' />
            <Picker.Item label= 'Panama' value= 'PA' />
            <Picker.Item label= 'Papua New Guinea' value= 'PG' />
            <Picker.Item label= 'Paraguay' value= 'PY' />
            <Picker.Item label= 'Peru' value= 'PE' />
            <Picker.Item label= 'Philippines' value= 'PH' />
            <Picker.Item label= 'Pitcairn' value= 'PN' />
            <Picker.Item label= 'Poland' value= 'PL' />
            <Picker.Item label= 'Portugal' value= 'PT' />
            <Picker.Item label= 'Qatar' value= 'QA' />
            <Picker.Item label= 'Reunion' value= 'RE' />
            <Picker.Item label= 'Romania' value= 'RO' />
            <Picker.Item label= 'Russian Federation' value= 'RU' />
            <Picker.Item label= 'Sao Tome and Principe' value= 'ST' />
            <Picker.Item label= 'Saudi Arabia' value= 'SA' />
            <Picker.Item label= 'Singapore' value= 'SG' />
            <Picker.Item label= 'Slovakia' value= 'SK' />
            <Picker.Item label= 'Slovenia' value= 'SI' />
            <Picker.Item label= 'Solomon Islands' value= 'SB' />
            <Picker.Item label= 'Somalia' value= 'SO' />
            <Picker.Item label= 'South Africa' value= 'ZA' />
            <Picker.Item label= 'Spain' value= 'ES' />
            <Picker.Item label= 'Sri Lanka' value= 'LK' />
            <Picker.Item label= 'Swaziland' value= 'SZ' />
            <Picker.Item label= 'Sweden' value= 'SE' />
            <Picker.Item label= 'Switzerland' value= 'CH' />
            <Picker.Item label= 'Syrian Arab Republic' value= 'SY' />
            <Picker.Item label= 'Taiwan, Province of China' value= 'TW' />
            <Picker.Item label= 'Tajikistan' value= 'TJ' />
            <Picker.Item label= 'Tanzania, United Republic of' value= 'TZ' />
            <Picker.Item label= 'Thailand' value= 'TH' />
            <Picker.Item label= 'Turkey' value= 'TR' />  
            <Picker.Item label= 'Uganda' value= 'UG' />
            <Picker.Item label= 'Ukraine' value= 'UA' />
            <Picker.Item label= 'United Arab Emirates' value= 'AE' />
            <Picker.Item label= 'United Kingdom' value= 'GB' />
            <Picker.Item label= 'United States' value= 'US' />
            <Picker.Item label= 'United States Minor Outlying Islands' value= 'UM' />
            <Picker.Item label= 'Uruguay' value= 'UY' />
            <Picker.Item label= 'Uzbekistan' value= 'UZ' />
            <Picker.Item label= 'Vanuatu' value= 'VU' />
            <Picker.Item label= 'Venezuela' value= 'VE' />
            <Picker.Item label= 'Viet Nam' value= 'VN' />
            <Picker.Item label= 'Yemen' value= 'YE' />
            <Picker.Item label= 'Zambia' value= 'ZM' />
            <Picker.Item label= 'Zimbabwe' value= 'ZW' />
    </Picker>
   </View>
  );
  
  
  export default countryItem;