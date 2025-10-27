using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace api.Services
{
    public class LinkServices : ILinkServices
    {
        public async Task<LinkMetadataDto> GetLinkMetadata(string url)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode(); // Throws an exception if the HTTP status code is not 200-299
                string htmlString = await response.Content.ReadAsStringAsync();
                // Load the HTML content into HtmlAgilityPack's HtmlDocument
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(htmlString);
                
                // Select the <title> node
                HtmlNode titleNode = htmlDoc.DocumentNode.SelectSingleNode("//head/title");
                string linkTitle = titleNode?.InnerText??"";
                //First Attempt To Find Image
                // Select the meta tag with property="og:image"
                HtmlNode ogImageNode = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:image']")??htmlDoc.DocumentNode.SelectSingleNode("//meta[@name='og:image']")??htmlDoc.DocumentNode.SelectSingleNode("//link[@rel='icon']");
                string linkIcon = ogImageNode.GetAttributeValue("content", string.Empty);
                if(linkIcon == "") linkIcon = ogImageNode.GetAttributeValue("href", string.Empty);

                return new LinkMetadataDto { LinkTitle = linkTitle, LinkIcon = linkIcon };
            }
        }
    }
}