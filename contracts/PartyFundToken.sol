pragma solidity ^0.4.24;

contract PartyFundToken{
    uint public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint public partyLimit = 50000000;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed _from, address indexed _to, uint tokens);
    event Approval(address indexed _tokenOwner, address indexed _spender, uint tokens);
    
    constructor (string tokenName, string tokenSymbol, uint initialSupply) public {
        totalSupply = initialSupply*10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
    }
    
    function _transfer (address _from, address _to, uint256 _value) internal {
        require(_to != 0x0);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]); //to prevent overflow
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
    }
    
    function transfer (address _to, uint256 _value) public returns (bool success) {
        //require(balanceOf[_to]+_value < partyLimit);
        
        if(balanceOf[_to]+_value >= partyLimit)
        {
            _transfer(msg.sender, _to, partyLimit - balanceOf[_to]);  //so that party cannot exceed its limit
        }
        
        _transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transferFrom (address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]); //compare how much tokens sender is allowed to spend.
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }
    
    function approve (address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}