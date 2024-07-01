from typing import Optional
from pydantic import BaseModel, Field

class LogData(BaseModel):
    page: str = Field(...)
    action: Optional[str] = Field(default=None)
    section: Optional[str] = Field(default=None)
    component: Optional[str] = Field(default=None)
    elementName: Optional[str] = Field(default=None)
