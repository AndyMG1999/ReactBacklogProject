using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;

namespace api.Interfaces
{
    public interface ILinkServices
    {
        public Task<LinkMetadataDto> GetLinkMetadata(string url); 
    }
}