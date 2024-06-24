from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Login(BaseModel):
    username: str = Field(...)
    failedAttempts: int = Field(...)
    isThrottled: bool = Field(...)
    throttleTime: Optional[datetime]
